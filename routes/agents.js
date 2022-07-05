module.exports.route = async function (server,models) {

    server.route({
        method: 'GET',
        path: '/api/agents',
        handler: async function(request, h) {           
            return await models.agents.find({});
        }
    });

    server.route({
        method: 'POST',
        path: '/api/agents/add',
        handler: async function(request, h) {   
            try {
                
                var g = await  new models.agents(request.payload).save();
                return g;
            } catch (error) {
                console.log(error);
                return error;
            }        
            
        }
    });

    server.route({
        method: 'POST',
        path: '/api/agents/delete',
        handler: async (request, h) => {  
            return await models.agents.deleteOne({_id:request.payload._id});
        }
    });

    server.route({
        method: 'GET',
        path: '/api/agents/getbynumber/{number}',
        handler:async (request, h) => {  
            return await models.agents.findOne({number:request.params.number});
        }
    });

}