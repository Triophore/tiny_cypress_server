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
        project_status:{
            type:String
        },
        project_start_time:{
            type : Date
        },
        project_stop_time:{
            type : Date
        },
        project_before: {
            type: Boolean
        },
        project_after: {
            type: Boolean
        },
        project_type:{
            type: String
        },
        project_operations:{
            type: Object
        },
        project_mpr_agent:{
            type: String
        },
        project_pup_agent:{
            type: String
        }


    });
    userSchema.plugin(require('mongoose-paginate-v2'))
    return mongoose.model('puppet_project', userSchema);

}