'use strict';

const Hapi = require('@hapi/hapi');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');
const config = require('./config');



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
        models.sms_group = await require('./models/sms_group')(mongoose, mongoosePaginate);

        models.email = await require('./models/email')(mongoose, mongoosePaginate);
        models.email_group = await require('./models/email_group')(mongoose, mongoosePaginate);
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
        console.log(socket.id)
    });

    require("./routes/api").route(server, models);
    require("./routes/sms").route(server, models);

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



    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();