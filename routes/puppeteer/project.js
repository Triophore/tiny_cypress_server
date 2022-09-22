module.exports.route = async function (server,models) {

    server.route({
        method: 'GET',
        path: '/api/puppeteer/project/{id}',
        handler: async function(request, h) {  
            var res = {};         
            var data =  await models.puppet_project.findOne({project_id : request.params.id});
            if(data){
                res.project = data;
              
                return res;
            }else{
                return res;
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/api/puppeteer/project/{id}',
        handler: async function(request, h) {        
            var data =  await models.puppet_project.findOneAndUpdate({project_id : request.params.id}, request.payload, {upsert: true})
           return data;
        }
    });

}

