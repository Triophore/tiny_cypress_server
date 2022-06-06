const config = require('./config');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt');
var prompt = require('prompt-sync')({});

async function start_data() {
    var models = {};
    if (config.mongodb) {
        await mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("DB Connected")
        });
        models.user = await require('./models/user')(mongoose, mongoosePaginate);
    }
    var data = await getData();
    data.password = await bcrypt.hash(data.password,config.bcrypt.round);
    var confirm = prompt('Create user with these (Yes/Y): ');
    if (confirm == 'Yes' || confirm == 'Y' || confirm == 'y' || confirm == 'yes' || confirm == 'YES') {
        var user = await new models.user(data).save();
        console.log(user)
        process.exit(1);
    } else {
        process.exit(1);
    }
}

async function getData() {
    console.log("Enter user data to create user");
    var username = prompt('enter Username: ');
    var email = prompt('enter Email: ');
    var password = prompt('enter password: ');
    var data = {
        username: username,
        email: email,
        password: password
    }
    console.table(data);
    return data;
}

start_data();