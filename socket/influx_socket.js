module.exports.influxSocket = function(socket,io,influx_write){

    socket.on("influx_insert_real",async function(data_packet) {
        //io.emit("engine_status",data)
        try {
            var influx_time = Date.now()
            const point1 = new Point(data_packet.project_id)
            point1.timestamp(data_packet.TimeStamp)
            //point1.tag("AdmissionId",data_packet.AdmissionId)
            // if("AdmissionId" in data_packet){
            //     if(data_packet.AdmissionId != ""){
            //         //point1.stringField("AdmissionId",data_packet.AdmissionId);
            //         point1.tag("AdmissionId",data_packet.AdmissionId)
            //     }
            // }
            // if("PatientId" in data_packet){
            //     if(data_packet.PatientId != ""){
            //         point1.tag("PatientId",data_packet.PatientId)
            //     }
            // }
            if("SEQ" in data_packet){
                point1.intField("SEQ",data_packet.SEQ);
            }
            if(data_packet.HR){
                point1.floatField("HR",data_packet.HR);
            }
            
            if(data_packet.RR){
                point1.floatField("RR",data_packet.RR);
            }
            
            if(data_packet.SKINTEMP){
                point1.floatField("SKINTEMP",data_packet.SKINTEMP);
            }
           
            if(data_packet.SPO2){
                point1.floatField("SPO2",data_packet.SPO2);
            }
            
            if(data_packet.PR){
                point1.floatField("PR",data_packet.PR);
            }
           
            if(data_packet.BODYTEMP){
                point1.floatField("BODYTEMP",data_packet.BODYTEMP);
            }
           
            if(data_packet.BP){
                point1.floatField("BP",data_packet.BP);
            }
            
            if(data_packet.BPSYS){
                point1.floatField("BPSYS",data_packet.BPSYS);
            }
           
            if(data_packet.BPDIA){
                point1.floatField("BPDIA",data_packet.BPDIA);
            }
            
    
            writeApi.writePoint(point1)
    
            var influx_db_time = Date.now() -  influx_time;
            
            log("INFLUX TIME :: " + influx_db_time);
    
            
        } catch (error) {
            log("INFLUX ERROR :: " + JSON.stringify(error))
            return false;
        }
    });

    // socket.on("server_engine",async function(data) {
    //     io.emit("client_engine",data)
    // });

    // socket.on("server_engine_status",async function(data) {
    //     io.emit("client_engine_status",data)
    // });

    // socket.on("engine_to_server",async function(data) {
    //     io.emit("agent_from_engine",data)
    // });

    // socket.on("engine_to_server_ping",async function(data) {
    //     io.emit("agent_from_engine_ping",data)
    // });

    // socket.on("engine_to_server_ui",async function(data) {
    //     io.emit("ui_from_engine",data)
    // });

}