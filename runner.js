var runner_state = {};
const PROJECT_DETAILS = process.argv.slice(2);

const project_name = PROJECT_DETAILS[0];



module.exports.runnerState = async function(){

}

async function start(){

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