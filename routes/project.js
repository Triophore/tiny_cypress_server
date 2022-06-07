module.exports.route = async function (server,models) {

    server.route({
        method: 'GET',
        path: '/api/project',
        handler: await function(request, h) {           
            return models.project.find({});
        }
    });
    
    server.route({
        method: 'POST',
        path: '/api/project/add',
        handler: await function(request, h) {           
            return new models.project(request.payload).save();
        }
    });

    server.route({
        method: 'POST',
        path: '/api/project/delete',
        handler: (request, h) => {  
            return models.project.deleteOne({_id:request.payload._id});
        }
    });


}