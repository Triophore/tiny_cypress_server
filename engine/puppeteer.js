const {parentPort} = require("worker_threads");

var timeout = 10000;
var operations = null

async function start(){
    parentPort.on("message", data => {
        //parentPort.postMessage({num: data.num, fib: getFib(data.num)});
        operations = data
    });
    var msg = {
        data:"Waiting for data..",
        type: "info"
    }
    parentPort.postMessage(msg);
}


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}