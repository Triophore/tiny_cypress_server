module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema({
        group: {
            type: String,
        },
        email: {
            type: String
        }

    });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('email', userSchema);

}