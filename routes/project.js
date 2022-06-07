module.exports.route = async function (server,models) {

    server.route({
        method: 'GET',
        path: '/api/project',
        handler: async function(request, h) {           
            return await models.project.find({});
        }
    });
    
    server.route({
        method: 'POST',
        path: '/api/project/add',
        handler: async function(request, h) {           
            return await new models.project(request.payload).save();
        }
    });

    server.route({
        method: 'POST',
        path: '/api/project/delete',
        handler: async (request, h) => {  
            return await models.project.deleteOne({_id:request.payload._id});
        }
    });


}