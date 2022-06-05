module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
        },
        middle_name: {
            type: String
        },
        last_name: {
            type: String,
        },
        profile_icon: {
            type: String,

        },
        firbase_token: {
            type: [String],
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
        },
        phone_number: {
            type: String
        }

    });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('user', userSchema);

}