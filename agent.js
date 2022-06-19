// const agent_db_path = "./db/agent.db";

// const { Level } = require('level')

// const agent_db = new Level(agent_db_path, {
//     valueEncoding: 'json'
// });


// module.exports.add_agent = async function (agent_info) {
//     console.log("add_agent")
//     await agent_db.put(agent_info.agent_id, agent_info);
// }

// module.exports.remove_agent = async function (agent_info) {
//     console.log("add_agent")
//     await agent_db.put(agent_info.agent_id, agent_info);
// }

var agents = {

}

module.exports.add_agent =  function (agent_info) {
    console.log("add_agent")
    if(agents[agent_info.id]){
        return false;
    }else{
        agents[agent_info.id] = agent_info;
        return true;
    }
    
}

module.exports.get_agent =  function (agent_name) {
    console.log("get_agent")
    return agents[agent_name];
}

module.exports.check_agent =  function (agent_name) {
    console.log("get_agent")
    if(agents[agent_name]){
        return true;
    }else{
        return false;
    }
}

module.exports.remove_agent =  function (agent_name) {
    console.log("remove_agent")
    delete agents[agent_name];
}