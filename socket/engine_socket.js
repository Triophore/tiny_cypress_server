var engine_array = [];
var path = require('path')
const spawn = require('child_process').spawn;
module.exports.engineSocket = function(socket,io){
    socket.on("project_spawn",async function(data) {
        spawn_runner(data,io)
    });

    socket.on("project_status",async function(data) {
        io.emit("engine_status",data)
    });

    socket.on("server_engine",async function(data) {
        io.emit("client_engine",data)
    });

    socket.on("server_engine_status",async function(data) {
        io.emit("client_engine_status",data)
    });

    socket.on("engine_to_server",async function(data) {
        io.emit("agent_from_engine",data)
    });

    socket.on("engine_to_server_ping",async function(data) {
        io.emit("agent_from_engine_ping",data)
    });

    socket.on("engine_to_server_ui",async function(data) {
        io.emit("ui_from_engine",data)
    });
}


function spawn_runner(project_id,io){
        var exec_path = path.join(__dirname,"..","engine.js")
        var engine_process = spawn('node', [exec_path,project_id]);
        engine_process.stdout.setEncoding('utf8');
        engine_process.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
            var pdata = {
                data : data,
                type : "stdout"
            }
            io.emit("engine_run",pdata);
        });

        engine_process.stderr.setEncoding('utf8');
        engine_process.stderr.on('data', function (data) {
            console.log('stdout: ' + data);
            var pdata = {
                data : data,
                type : "stderr"
            }
            io.emit("engine_run",pdata);
        });

        engine_process.on('close', function (code) {
            console.log('stdout: ' + code);
            var data = {
                data : "process code:"+code,
                type : "end"
            }
            io.emit("engine_run",data);
        });

        engine_array.push(engine_process)
}