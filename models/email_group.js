module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema({
        group: {
            type: String,
        }

    });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('email_group', userSchema);

}