const { Worker } = require('worker_threads');
const { io } = require("socket.io-client");
const config = require("./config")
var engine_state = {};
const PROJECT_DETAILS = process.argv.slice(2);
const project_name = PROJECT_DETAILS[0];
const mongoose = require('mongoose');
const path = require("path");

var models = {};

var rotatingLogStream = require('file-stream-rotator').getStream(
    { 
        filename: "log/ENGINE-%DATE%.log", 
        frequency: "daily", 
        verbose: true,
        size:'100m',
        max_logs:2,
        audit_file:"log/audit/main.json" 
    }
);

function LTS(data) {
    rotatingLogStream.write( Date.now() +"::"+ data + "\n")
}



const log = LTS


LogWithTS("ZENO Engine started...");
log("ZENO Engine started...");
if(!project_name){
    LogWithTS("Project ID not found, exiting")
    LogWithTS("Engine is going to exit now..")
    LogWithTS("Bye..")
    log("Project ID not found, exiting")
    log("Engine is going to exit now..")
    log("Bye..")
    process.exit(0)   
}
LogWithTS("Socket connecting..")
LogWithTS("http://"+config.server.host+":"+config.server.port)
log("Socket connecting..")
log("http://"+config.server.host+":"+config.server.port)
const socket = io("http://"+config.server.host+":"+config.server.port);
LogWithTS("Reading project details for "+ project_name);
log("Reading project details for "+ project_name);

var play = true;

var status = {}

status.project = project_name;

async function start(){

   

    if (config.mongodb) {
        await mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
       
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            LogWithTS("DB Connected")
            log("DB Connected")
        });

        var db_driver = mongoose.connection.db;

        const full_path = path.join(__dirname,'models');

        //console.log(full_path)

        models.project = await require(path.join(full_path,'project.js'))(mongoose);
        models.puppet_project = await require(path.join(full_path,'puppet_project.js'))(mongoose);
        models.puppet_project_run = await require(path.join(full_path,'puppet_project_run.js'))(mongoose);
        models.puppet_project_result = await require(path.join(full_path,'puppet_project_result.js'))(mongoose);


        var project = await  models.project.findOne({_id : project_name});

        if(!project){
            LogWithTS("Project not found, exiting")
            LogWithTS("Engine is going to exit now..")
            LogWithTS("Bye..")
            log("Project not found, exiting")
            log("Engine is going to exit now..")
            log("Bye..")
            process.exit(0) 
        }
        //LogWithTS(project)
        LogWithTS("Project Name :: "+project.project_name)
        LogWithTS("Project Type :: "+project.project_type)
        log("Project Name :: "+project.project_name)
        log("Project Type :: "+project.project_type)

        if(project.project_type == "Puppet"){
            var project_details = await models.puppet_project.findOne({project_id : project._id})
            //.findOne({project_id : project.project_id})

            LogWithTS(project_details)
            LogWithTS("Checking Puppeteer Agent")
            log(JSON.stringify(project_details))
            log("Checking Puppeteer Agent")
            if(!project_details.project_pup_agent){
                LogWithTS("Puppeteer agent not selected !...")
                LogWithTS("Engine is going to exit now..")
                LogWithTS("Bye..")
                log("Puppeteer agent not selected !...")
                log("Engine is going to exit now..")
                log("Bye..")
                process.exit(0)
            }

            LogWithTS("Puppeteer Agent Number :: "+ project_details.project_pup_agent)
            LogWithTS("Checking MPR Agent")

            log("Puppeteer Agent Number :: "+ project_details.project_pup_agent)
            log("Checking MPR Agent")

            // if(!project_details.project_mpr_agent){
            //     LogWithTS("MPR agent not connected!...")
            //     LogWithTS("Engine is going to exit now..")
            //     LogWithTS("Bye..")
            //     process.exit(0)
            // }

            await sleep(3000)
            if(socket.id){
                LogWithTS("Socket Connected..")  
                log("Socket Connected..")  
            }

            LogWithTS("MPR Agent Number :: "+ project_details.project_mpr_agent)
            LogWithTS("Pinging MPR Agent :: "+ project_details.project_mpr_agent)

            log("MPR Agent Number :: "+ project_details.project_mpr_agent)
            log("Pinging MPR Agent :: "+ project_details.project_mpr_agent)


            socket.emit("engine_to_server_ping",project_details.project_mpr_agent)
            socket.emit("engine_to_server_ping",project_details.project_pup_agent)



            

            LogWithTS("Loading operations ....")
            log("Loading operations ....")
            var operations = project_details.project_operations;
            LogWithTS("Operations count :: " + operations.length)
            LogWithTS("Launching operations")

            log("Operations count :: " + operations.length)
            log("Launching operations")

            for (let index = 0; index < operations.length; index++) {
                const element = operations[index];
                //LogWithTS("Operation for Param : " + element.param + " Value : " + element.value + " TimeOut : " + element.timestamp )
                var timeout = element.timestamp * 1000 
                var tick = 0;
                while(tick < timeout){
                    await sleep(1000)
                    var agent_data = element;
                    agent_data.agent_number = project_details.project_mpr_agent 
                    agent_data.TS = Date.now()
                    socket.emit("engine_to_server_ui",agent_data)
                    LogWithTS(` Operation With Tick -->>  
                                HR         :  ${element.value_hr}    
                                RR         :  ${element.value_rr}    
                                SPO2       :  ${element.value_spo2}  
                                BPSYS      :  ${element.value_bpsys} 
                                BPDIA      :  ${element.value_bpdia} 
                                SKINTEMP   :  ${element.value_bpdia} 
                                BODYTEMP   :  ${element.value_bpdia} 
                                TimeOut    :  ${element.timestamp}   
                                TICK       :  ${tick}` )
                            log(` Operation With Tick -->>  
                                HR         :  ${element.value_hr}    
                                RR         :  ${element.value_rr}    
                                SPO2       :  ${element.value_spo2}  
                                BPSYS      :  ${element.value_bpsys} 
                                BPDIA      :  ${element.value_bpdia} 
                                SKINTEMP   :  ${element.value_bpdia} 
                                BODYTEMP   :  ${element.value_bpdia} 
                                TimeOut    :  ${element.timestamp}   
                                TICK       :  ${tick}` )
                    tick = tick + 1000;
                }   
                //await sleep(element.timestamp * 1000)
                socket.emit("engine_to_server",agent_data)  
                if(!play){
                    LogWithTS("Engine paused....")
                    log("Engine paused....")
                }
                while(!play){
                    await sleep(100)
                }
            }


        }

    
    }else{
        LogWithTS("MongoDB not config, exiting")
        LogWithTS("Engine is going to exit now..")
        LogWithTS("Bye..")
        log("MongoDB not config, exiting")
        log("Engine is going to exit now..")
        log("Bye..")
        process.exit(0)
    }
    



    LogWithTS("Sleeping for 5 seconds")
    log("Sleeping for 5 seconds")
    await sleep(5000)
    LogWithTS("Wakeup from sleep")
    log("Wakeup from sleep")

    LogWithTS("Engine is going to exit now..")
    LogWithTS("Bye..")
    log("Engine is going to exit now..")
    log("Bye..")
    process.exit(0)



}

socket.on("connect", async function () {
    LogWithTS("Socket connected success");
    LogWithTS("Socket ID "+ socket.id)
    log("Socket connected success");
    log("Socket ID "+ socket.id)

    socket.emit("server_engine",project_name)
});

socket.on("play", async function (data) {
    // LogWithTS("Socket connected success");
    // LogWithTS("Socket ID "+ socket.id)
    if(data.id = project_id){
        LogWithTS("Pause request found.");
        LogWithTS("Engine will pause now");
        log("Pause request found.");
        log("Engine will pause now");
        play = false;
    }
});

socket.on("pause", async function (data) {
    // LogWithTS("Socket connected success");
    // LogWithTS("Socket ID "+ socket.id)
    if(data.id = project_id){
        LogWithTS("Pause request found.");
        LogWithTS("Engine will pause now");
        log("Pause request found.");
        log("Engine will pause now");
        play = true;
    }
});
socket.on("engine_status", async function (data) {
    // LogWithTS("Socket connected success");
    // LogWithTS("Socket ID "+ socket.id)
    if(data.id = status.project){
        LogWithTS("Pause request found.");
        LogWithTS("Engine will pause now");
        log("Pause request found.");
        log("Engine will pause now");
        socket.emit("server_engine_status",project_name)
    }
});

//agent_disconnected

socket.on("agent_disconnected", async function (data) {
    // LogWithTS("Socket connected success");
    LogWithTS("Agent disconnected"+data)
    log("Agent disconnected"+data)
});

socket.on("destroy", async function (data) {
    // LogWithTS("Socket connected success");
    // LogWithTS("Socket ID "+ socket.id)
});

socket.on("disconnect", () => {
    LogWithTS("Disconnecting ..");
    LogWithTS("Engine is going to exit now..")
    LogWithTS("Bye..")
    log("Disconnecting ..");
    log("Engine is going to exit now..")
    log("Bye..")
    process.exit(0) 
});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

function sleepwithcallback(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

function LogWithTS(data){
    console.log(Date.now()+"::"+data)
}

try{
    start()
}catch(ex){
    var msg = {
        type : "error",
        msg : ex
    }
    LogWithTS(JSON.stringify(msg))
    log(JSON.stringify(msg))
}



