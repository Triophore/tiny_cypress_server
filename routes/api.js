var cypress_parser = require("../cypress_parse")
module.exports.route = async function (server,mongoose,io,db_driver) {
    server.route({
        method: 'POST',
        path: '/submit_all',
        options: { auth: false },
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"submit_all_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/before_run',
        options: { auth: false },
        handler: async (request, h) => {
            console.log("before_run");
            //require('fs').writeFileSync(require("path").join(__dirname,"before_run_"+Date.now()+".json"), JSON.stringify(request.payload));

            try {
                io.emit('ui_before_run', request.payload);
                //var res = await new mongoose.cypress_project_before(request.payload).save();
                var res = await cypress_parser.parseBeforeRun(request.payload,db_driver);
                 console.log(res)
                return res;
            } catch (error) {
                console.log(error);
            return error
                
            }
            
        }
    });

    server.route({
        method: 'POST',
        path: '/after_run',
        options: { auth: false },
        handler: async (request, h) => {
            // require('fs').writeFileSync(require("path").join(__dirname,"after_run_"+Date.now()+".json"), JSON.stringify(request.payload));
            // var res = await new mongoose.cypress_project_after(request.payload).save();
            return "res";
            
        }
    });

    server.route({
        method: 'POST',
        path: '/before_spec',
        options: { auth: false },
        handler: async (request, h) => {
            //require('fs').writeFileSync(require("path").join(__dirname,"before_spec_"+Date.now()+".json"), JSON.stringify(request.payload));
            io.emit('ui_before_spec', request.payload);
            var res = await new mongoose.cypress_spec_before(request.payload).save();
            return res;
            
        }
    });

    server.route({
        method: 'POST',
        path: '/after_spec',
        options: { auth: false },
        handler: async (request, h) => {
            //require('fs').writeFileSync(require("path").join(__dirname,"after_spec_"+Date.now()+".json"), JSON.stringify(request.payload));
            io.emit('ui_after_spec', request.payload);
            io.emit('ui_after_spec_media', request.payload);
            //var res = await new mongoose.cypress_spec_after(request.payload).save();
            return "res";
        }
    });


    server.route({
        method: 'POST',
        path: '/before_browser_launch',
        options: { auth: false },
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"before_browser_launch_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/filepreprocessor',
        options: { auth: false },
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"filepreprocessor_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/task',
        options: { auth: false },
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"task_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/project/video_upload',
        options: { auth: false },
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"task_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/project/screenshot_upload',
        options: { auth: false },
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"task_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });
}