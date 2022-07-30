const agents = require('../agent');
module.exports.agentSocket = function (socket,io) {
    socket.on("disconnect", () => {
        if(agents.check_agent(socket.id)){
            console.log( agents.get_agent(socket.id))
            console.log( "agents.get_agent(socket.id)")
            io.emit('agent_disconnected', agents.get_agent(socket.id));
        }  
    });
    socket.on("join_agent", async function (data) {

        // if (socket.agentRoom) {
        //     socket.leave(socket.agentRoom);
        //     socket.agentRoom = null;
        // }
        //socket.agentRoom = data.project_id;
        data.id = socket.id
        data.agent_id = socket.id
        // socket.join(data.project_id);
        // console.log("Agent join room");
        // console.log(data.project_id)
        agents.add_agent(data);
        //.in(data.project_id)
        io.emit('agent_connected', data);
    });

    socket.on("agent_info_recv", async function (data) {
        console.log("Agent info recv");
        console.log(data)
        //.in(data.project_id)
        io.emit('agent_connected', data);
    });

    socket.on("ui_start_agent", async function (data) {
        io.in(data.project.project_id).emit('agent_start', data);
    });

    socket.on("get_agent_status", async function (data) {
        io.in(data.project_id).emit('update_agent', data);
    });

    socket.on("get_all_agents", async function (data) {
        console.log("get_all_agents")
        //console.log(data.project_id)
        //.in(data.project_id) .in(data.project_id)
        io.emit('agent_info_send', data);
    });
}