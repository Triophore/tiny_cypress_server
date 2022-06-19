module.exports.route = async function (server,models) {

    server.route({
        method: 'GET',
        path: '/api/agents',
        handler: await function(request, h) {           
            return models.agents.find({});
        }
    });

    server.route({
        method: 'POST',
        path: '/api/agents/add',
        handler: await function(request, h) {           
            return new models.agents(request.payload).save();
        }
    });

    server.route({
        method: 'POST',
        path: '/api/agents/delete',
        handler: (request, h) => {  
            return models.agents.deleteOne({_id:request.payload._id});
        }
    });

    server.route({
        method: 'GET',
        path: '/api/agents/getbynumber/{number}',
        handler: (request, h) => {  
            return models.agents.findOne({number:request.params.number});
        }
    });

}