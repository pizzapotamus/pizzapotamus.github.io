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
        let resp = "no message";
        async function waitUserInput(e){
            while (next === false) await timeout(50); // pause script but avoid browser to freeze ;)
            next = false; // reset var
            console.log('user input detected');
            e.call(resp);
        }
        let id = this.message++;
        $('#requestResponseResponses').append("<div id='div" + id + "'>" + message + " <input type='text' id='response'" + id + "/><button id=btn" + id + ">Response</button>");
        $('#btn' + id).on('click', function (e) {
            let input = $('#requestResponseArea');
            //todo call rsocket and get id
            input.val('');
            resp = new HelloResponse();
            resp.setMessage("Hello, " + message.getName() + "! from " + serviceName);
            next = true;
        });
        return new Single(subscriber => {
            subscriber.onSubscribe();
            waitUserInput((value) => subscriber.onComplete(value));
        });
    };
}

//DefaultHelloService.constructor = DefaultHelloService;

module.exports = {DefaultHelloService};
