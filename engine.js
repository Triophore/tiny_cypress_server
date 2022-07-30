const { Worker } = require('worker_threads')

var engine_state = {};
const PROJECT_DETAILS = process.argv.slice(2);

const project_name = PROJECT_DETAILS[0];




async function start(){

    console.log("ZENO Engine started...");
    console.log("Reading project details for "+ project_name);
    console.log("")



}


try{
    start()
}catch(ex){
    var msg = {
        type : "error",
        msg : ex
    }
    console.log(JSON.stringify(msg))
}



