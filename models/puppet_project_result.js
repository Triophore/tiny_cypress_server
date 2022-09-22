module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema({
        project_id: {
            type: String,
            unique: true,
            required : true
        },
        project_status:{
            type:String
        },
        project_time:{
            type : Date
        },
        project_value:{
            type : {}
        },
    });
    userSchema.plugin(require('mongoose-paginate-v2'))
    return mongoose.model('puppet_project_result', userSchema);

}