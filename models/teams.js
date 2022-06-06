module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
        },
        webhook: {
            type: String
        }

    });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('teams', userSchema);

}