'use strict';

const Hapi = require('@hapi/hapi');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');
const config = require('./config');
const Blipp = require('blipp');

const agents = require('./agent');


const init = async () => {

    var models = {};

    if (config.mongodb) {
        await mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("DB Connected")
        });
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
    }

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
            cors: true
        }
    });

    var io = new Server(server.listener, {
        cors: {
            origin: "*"
        }
    });

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


    io.on("connection", (socket) => {
        //console.log(socket.id)
        socket.on("disconnect", () => {
            if(agents.check_agent(socket.id)){
                console.log( agents.get_agent(socket.id))
                io.emit('agent_disconnected', agents.get_agent(socket.id));
            }
            
        });

        socket.on("join_agent",async function(data) {
          
                if (socket.agentRoom) {
                    socket.leave(socket.agentRoom);
                    socket.agentRoom = null;
                }
                socket.agentRoom = data.project_id;
                data.id = socket.id
                data.agent_id = socket.id
                socket.join(data.project_id);
                console.log("Agent join room");
                console.log(data.project_id)
                agents.add_agent(data);
                //.in(data.project_id)
               io.emit('agent_connected', data);
        });

        socket.on("agent_info_recv",async function(data) {
            console.log("Agent info recv");
            console.log(data)
            io.in(data.project_id).emit('update_agent', data);
        });

        socket.on("ui_start_agent",async function(data) {
            io.in(data.project.project_id).emit('agent_start', data);
        });

        socket.on("get_agent_status",async function(data) {
            io.in(data.project_id).emit('update_agent', data);
        });

        socket.on("get_all_agents",async function(data) {
            console.log("get_all_agents")
            console.log(data.project_id)
            console.log("get_all_agents")
            //.in(data.project_id)
            io.in(data.project_id).emit('agent_info_send');
        });


        socket.on("join_user",async function(data) {
            // if (socket.userRoom) {
            //     socket.leave(socket.userRoom);
            //     socket.userRoom = null;
            // }
            // socket.userRoom = data.user_id;
            console.log(data)
            socket.join(data.project_id);
            //io.in(data.project_id).emit('agent_info_send', data);
            console.log("User  join room")
        });
    });

    require("./routes/api").route(server, models,io);
    require("./routes/sms").route(server, models);
    require("./routes/user").route(server, models);
    require("./routes/email").route(server, models);
    require("./routes/teams").route(server, models);
    require("./routes/project").route(server, models);
    require("./routes/agents").route(server, models);

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




    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();