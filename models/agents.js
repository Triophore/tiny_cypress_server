module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        number: {
            type: String,
            unique : true
        }

    });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('agents', userSchema);

}