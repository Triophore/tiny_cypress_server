'use strict';

const Hapi = require('@hapi/hapi');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');
const config = require('./config');
const Blipp = require('blipp');
const Inert = require('@hapi/inert');
const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { fips } = require('crypto');
const { InfluxDB, Point, HttpError } = require('@influxdata/influxdb-client')
const { hostname } = require('os')


const init = async () => {

    var models = {};

    if (config.mongodb) {
        await mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
       
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("DB Connected")
        });

        var db_driver = mongoose.connection.db;


       // var d = await db_driver.collection("users").find({}).toArray();

       // console.log(d)

        models.user = await require('./models/user')(mongoose, mongoosePaginate);
        models.sms = await require('./models/sms')(mongoose, mongoosePaginate);
        models.agents = await require('./models/agents')(mongoose, mongoosePaginate);
        models.sms_group = await require('./models/sms_group')(mongoose, mongoosePaginate);
        models.email = await require('./models/email')(mongoose, mongoosePaginate);
        models.email_group = await require('./models/email_group')(mongoose, mongoosePaginate);
        models.teams = await require('./models/teams')(mongoose, mongoosePaginate);
        models.project = await require('./models/project')(mongoose, mongoosePaginate);
        models.cypress_project_after = await require('./models/cypress_project_after')(mongoose, mongoosePaginate);
        models.cypress_spec_after = await require('./models/cypress_spec_after')(mongoose, mongoosePaginate);
        models.cypress_spec_before = await require('./models/cypress_spec_before')(mongoose, mongoosePaginate);
        models.cypress_project_before = await require('./models/cypress_project_before')(mongoose, mongoosePaginate);


        //pupeeteer project models
        models.puppet_project = await require('./models/puppet_project')(mongoose, mongoosePaginate);
        models.puppet_project_run = await require('./models/puppet_project_run')(mongoose, mongoosePaginate);
        models.puppet_project_result = await require('./models/puppet_project_result')(mongoose, mongoosePaginate);
    }else{
        console.log("No mongo config found")
        process.exit(0)
    }


    const writeApi = new InfluxDB({ url: config.influx_db, token: config.influx_db_token }).getWriteApi(config.influx_db_org, config.influx_db_bucket,"s");

    writeApi.useDefaultTags({ location: hostname() })

    const JWT   = require('jsonwebtoken');

    function create_jwt_token(data){
        return JWT.sign(data, config.jwt.key,{
            expiresIn : "30d"
        });
        
    }

    var server = Hapi.server({
        port: config.server.port,
        host: config.server.host,
        routes: {
            cors: true,
            files: {
                relativeTo: path.join(__dirname, 'static')
            }
        }
    });

    var io = new Server(server.listener, {
        cors: {
            origin: "*"
        }
    });

    await server.register(Inert);

    await server.register({ plugin: Blipp, options: { showAuth: true } });

    await server.register({
        plugin: {
            name: 'Kepler-SocketIO',
            version: '1.0.0',
            register: async function (server, options) {
                await server.decorate('toolkit', 'SocketIO', options.io);
            }
        },
        options: {
            io
        }
    });

    var user_socket = require("./socket/user_socket");
    var agent_socket = require("./socket/agent_socket");
    var engine_socket = require("./socket/engine_socket");
    var influx_socket = require("./socket/influx_socket");

    io.on("connection", (socket) => {
        //console.log(socket.id)
        user_socket.userSocket(socket,io);
        agent_socket.agentSocket(socket,io);
        engine_socket.engineSocket(socket,io);
        influx_socket.influxSocket(socket,io,writeApi);
    });

    require("./routes/api").route(server, models,io,db_driver);
    require("./routes/sms").route(server, models);
    require("./routes/user").route(server, models);
    require("./routes/email").route(server, models);
    require("./routes/teams").route(server, models);
    require("./routes/project").route(server, models);
    require("./routes/agents").route(server, models);
    require("./routes/puppeteer/project").route(server, models);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            if (h.SocketIO) {
                h.SocketIO.emit("hello");
            }
            return 'Hello World!';
        }
    });

    const validate = async function (decoded, request, h) {

        // do your checks to see if the person is valid
        //console.log(decoded)
        //var decoded_p = Buffer.from(decoded.token, "base64").toString("utf8")
        if (decoded == null || decoded == undefined) {
          return { isValid: false };
        }
        else {
          return { isValid: true };
        }
    };

    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt',
    { key: config.jwt.key, // Never Share your secret key
      validate  // validate function defined above
    });


    server.auth.default('jwt');

    server.route({
        method: 'POST',
        path: '/api/user/login',
        
        config: { auth: {
            mode: 'try'
        } }, 
        handler: async (request, h) => {
           
            const payload = request.payload

            try{
                if(typeof (payload.username) == undefined){
                    return h.response({status:false}).code(401)
                }
                var user_logged = await models.user.findOne({'username':payload.username});
                //console.log(user_logged);
                var logged_data = {
                }
                if(user_logged == null){
                    logged_data.status = false;
                    return h.response(logged_data).code(401)
                }else{

                    const match = await bcrypt.compare(request.payload.password, user_logged.password);
                    if(match){
                        logged_data.status = true;
                        var token_data = {
                            token: user_logged._id.toString(), 
                            role:user_logged.role 
                            
                            //Buffer.from(user_logged._id.toString(), "utf8").toString("base64")
                        };
                        //logged_data.token = create_jwt_token(JSON.stringify(token_data));
                        logged_data.token = create_jwt_token(token_data);
                        console.log(logged_data);
                        return logged_data;
                    }else{
                        return h.response({status:false}).code(401)
                    }
                   
                }
           
                
            }catch(ex){
                //console.log(ex)
                return h.response({status:false}).code(401)
            }
            
            return h.response(err_res).code(401)
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        options: {
            auth: false,
        },
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true
            }
        }
    });
    
    server.route({
        path: '/upload/video',
        method: 'POST',
        options: {
            auth: false,
            payload: {
            output: 'stream',
            maxBytes: 209715200,
            parse: true,
            allow: 'multipart/form-data',
            multipart : true  // <== this is important in hapi 19
            }
        },
        handler: async (req, h) => {
            const data = req.payload;
            console.log(data);
            if (data.file) {
                var name =  uuidv4()+".mp4"
            
            const filepath = path.join(__dirname, 'static',"videos",name);
            const outputStream = fs.createWriteStream(filepath);
            data.file.pipe(outputStream);
            }
            return 'ok';
        }
    })

    server.route({
        path: '/upload/image',
        method: 'POST',
        options: {
            auth: false,
            payload: {
            output: 'stream',
            maxBytes: 209715200,
            parse: true,
            allow: 'multipart/form-data',
            multipart : true  // <== this is important in hapi 19
            }
        },
        handler: async (req, h) => {
            const data = req.payload;
            console.log(data);
            if (data.file) {
                var name =  uuidv4()+".png"
                const filepath = path.join(__dirname, 'static',"images",name);
                const outputStream = fs.createWriteStream(filepath);
                data.file.pipe(outputStream);
            }
            return 'ok';
        }
    })




    await server.start();
    console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
