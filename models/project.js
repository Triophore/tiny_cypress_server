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
        project_before: {
            type: Boolean
        },
        project_after: {
            type: Boolean
        },
        spec_before: {
            type: Boolean
        },
        spec_after: {
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
        },
        project_type:{
            type: String
        }


    });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('project', userSchema);

}