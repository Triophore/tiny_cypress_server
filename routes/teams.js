module.exports.route = async function (server,models) {

    server.route({
        method: 'GET',
        path: '/api/teams',
        handler: await function(request, h) {           
            return models.teams.find({});
        }
    });

    server.route({
        method: 'POST',
        path: '/api/teams/add',
        handler: await function(request, h) {           
            return new models.teams(request.payload).save();
        }
    });

    server.route({
        method: 'POST',
        path: '/api/teams/delete',
        handler: (request, h) => {  
            return models.teams.deleteOne({_id:request.payload._id});
        }
    });

}