const {HelloResponse} = require('./netifi/service_pb');
const {
    Single
} = require('rsocket-flowable');

function DefaultHelloService(serviceName, logFunction) {
    this.serviceName = serviceName;
    this.message = 0;

/*
    this.sayHello = function(message){
        logFunction("Received Hello from " + message.getName());
        logFunction("Responding...");
        const resp = new HelloResponse();
        resp.setMessage("Hello, " + message.getName() + "! from " + this.serviceName);
        return Single.of(resp);
    };

*/
    this.sayHello = async function (message) {
        const timeout = async ms => new Promise(res => setTimeout(res, ms));
        let next = false;
        async function waitUserInput() {
            while (next === false) await timeout(50); // pause script but avoid browser to freeze ;)
            next = false; // reset var
            console.log('user input detected');
        }
        let id = this.message++;
        $('#requestResponseResponses').append("<div id='div" + id + "'>" + message + " <input type='text' id='response'" + id + "/><button id=btn" + id + ">Response</button>");
        let resp = "no message";
        $('#btn' + id).on('click', function (e) {
            let input = $('#requestResponseArea');
            //todo call rsocket and get id
            input.val('');
            resp = new HelloResponse();
            resp.setMessage("Hello, " + message.getName() + "! from " + serviceName);
            next = true;
        });
        console.log("test");
        await waitUserInput();
        console.log("test2");
        return Single.of(resp);
    };
}

//DefaultHelloService.constructor = DefaultHelloService;

module.exports = {DefaultHelloService};
