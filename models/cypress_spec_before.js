module.exports = async function (mongoose) {

    const userSchema = new mongoose.Schema(
        {
            project_id: {
                type: String
            },
            spec: {
                name: {
                    type: String
                },
                relative: {
                    type: String
                },
                absolute: {
                    type: String
                },
                specType: {
                    type: String
                }
            }

        });


    userSchema.plugin(require('mongoose-paginate-v2'))



    return mongoose.model('cypress_spec_before', userSchema);

}