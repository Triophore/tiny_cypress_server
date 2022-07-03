module.exports.parseBeforeRun = async function (data,mongo_db){
    console.log("parseBeforRun")
    var project_start_time = new Date();
    var browser = data.browser;
    var specs = data.specs;
    var config = data.config;
    var system = data.system;
    var project_id = data.project_id;

    var project_run = {
        project_id: project_id,
        project_start_time: project_start_time,
        project_status: "started",
        project_browser : browser,
        project_system : system
    };

    var project_run_res = await mongo_db.collection("project_run").insertOne(project_run);

    //if(project_run_res.acknowledged){
        var project_specs = [];

        for (var i = 0; i < specs.length; i++) {
            var spec = specs[i];
            spec.project_id = project_id;
            spec.status = "notstarted";
            spec.project_id_mongo = project_run_res.insertedId;
            spec.reg_time = project_start_time;
            project_specs.push(spec);
        
        }
    
       console.log(project_run_res)

       var specs_reg =  await mongo_db.collection("project_specs").insertMany(project_specs);
       return data
    //}

    

}

module.exports.parseAfterRun = async function (data,mongo_db){

}