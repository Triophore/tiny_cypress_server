module.exports.route = async function (server,mongoose) {
    server.route({
        method: 'POST',
        path: '/submit_all',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"submit_all_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/before_run',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"before_run_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/after_run',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"after_run_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/before_spec',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"before_spec_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/after_spec',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"after_spec_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });


    server.route({
        method: 'POST',
        path: '/before_browser_launch',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"before_browser_launch_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/filepreprocessor',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"filepreprocessor_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/task',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"task_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/project/video_upload',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"task_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/project/screenshot_upload',
        handler: (request, h) => {
            require('fs').writeFileSync(require("path").join(__dirname,"task_"+Date.now()+".json"), JSON.stringify(request.payload));
            return 'Hello World!';
        }
    });
}