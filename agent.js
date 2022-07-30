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