module.exports.route = async function (server,mongoose) {
    server.route({
        method: 'POST',
        path: '/api/users/add',
        handler: async (request, h) => {
            
           var d =  await new mongoose.user(request.payload).save();
          // console.log(d)
           return d;
        }
    });

    server.route({
        method: 'GET',
        path: '/api/user',
        handler: async (request, h) => {
            var user_id = request.auth.credentials.token;
                var ObjectID = require('mongodb').ObjectID;
                user_id = new ObjectID(user_id);
            
           var d =  await mongoose.user.findOne({_id:user_id});
          // console.log(d)
           return {user : d};
        }
    });

    server.route({
        method: 'GET',
        path: '/api/users/',
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
              
                query.username = {
                    $regex:request.query.search,
                    $options: 'i'
                }
               
            }

            var res = await mongoose.user.paginate(query,options);
           // console.log(res);
            return {
                status:true,
                data:res
            }
        }
    });

}