module.exports.userSocket = function(socket,io){
    socket.on("join_user",async function(data) {
        console.log(data)
        socket.join(data.project_id);
        console.log("User  join room")
    });
}