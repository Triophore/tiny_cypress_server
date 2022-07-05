module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
        },
        number: {
            type: String,
            unique : true
        },
        agent_type: {
            type: String,
        }

    });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('agents', userSchema);

}