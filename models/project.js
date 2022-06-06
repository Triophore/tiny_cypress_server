module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema({

        project_name: {
            type: String,
            unique: true,
            required : true
        },
        project_id: {
            type: String,
            unique: true,
            required : true
        },
        project_before_project: {
            type: Boolean
        },
        project_after_project: {
            type: Boolean
        },
        project_before_spec: {
            type: Boolean
        },
        project_after_spec: {
            type: Boolean
        },
        project_teams:{
            type: Array
        },
        project_sms:{
            type: Array
        },
        project_email:{
            type: Array
        },
        project_slack:{
            type: Array
        },
        project_run_count:{
            type: String
        }


    });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('project', userSchema);

}