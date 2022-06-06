module.exports.route = async function (server,models) {

    server.route({
        method: 'GET',
        path: '/api/email',
        handler: await function(request, h) {           
            return models.email.find({});
        }
    });

    server.route({
        method: 'GET',
        path: '/api/email/groups',
        handler: await function(request, h) {           
            return models.email_group.find({});
        }
    });
    
    server.route({
        method: 'POST',
        path: '/api/email/add',
        handler: await function(request, h) {           
            return new models.email(request.payload).save();
        }
    });

    server.route({
        method: 'POST',
        path: '/api/email/delete',
        handler: (request, h) => {  
            return models.email.deleteOne({_id:request.payload._id});
        }
    });

    server.route({
        method: 'POST',
        path: '/api/email/group/add',
        handler: async function(request, h){ 
            return new models.email_group(request.payload).save();
        }
    });

    server.route({
        method: 'POST',
        path: '/api/email/group/delete/',
        handler: (request, h) => {
            return models.email_group.deleteOne({_id:request.payload._id});
        }
    });

}