module.exports.route = async function (server,models) {

    server.route({
        method: 'GET',
        path: '/api/project',
        handler: async function(request, h) {           
            return await models.project.find({});
        }
    });

    server.route({
        method: 'GET',
        path: '/api/project/ui/{id}',
        handler: async function(request, h) {  
            var res = {};         
            var data =  await models.project.findOne({_id : request.params.id});
            if(data){
                res.project = data;            
                return res;
            }else{
                return res;
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/projects',
        handler: async(request, h) => {
            //return mongoose.user.find({});
            const options = {
                limit:request.query.items_perpage || 10,
                page:request.query.page || 1,
               
                //sort: { task_created: -1 },
            };
            var query = {
               // $or:[ {'task_status':"CT"},{'task_status':"CL"} ],
            };
           
            if(request.query.search){
              
                query.project_name= {
                    $regex:request.query.search,
                    $options: 'i'
                }
               
            }

            var res = await models.project.paginate(query,options);
           // console.log(res);
            return {
                status:true,
                data:res
            }
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

    // server.route({
    //     method: 'POST',
    //     path: '/api/project/run/data/{id}',
    //     handler: async (request, h) => {  
    //         return await models.project_run.find({
    //             project_id : request.params.id
    //         }).sort({
    //             project_start_time : -1
    //         })
    //     }
    // });


}