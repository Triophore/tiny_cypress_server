module.exports.route = async function (server,models) {

    server.route({
        method: 'GET',
        path: '/api/sms',
        handler: await function(request, h) {           
            return models.sms.find({});
        }
    });

    server.route({
        method: 'GET',
        path: '/api/sms/groups',
        handler: await function(request, h) {           
            return models.sms.find({});
        }
    });
    
    server.route({
        method: 'POST',
        path: '/api/sms/add',
        handler: await function(request, h) {           
            return new models.sms(request.payload).save();
        }
    });

    server.route({
        method: 'POST',
        path: '/api/sms/delete',
        handler: (request, h) => {  
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/api/sms/group/add',
        handler: async function(request, h){ 
            return new models.sms_group(request.payload).save();
        }
    });

    server.route({
        method: 'POST',
        path: '/api/sms/group/delete',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

}