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
    this.sayHello = function (message) {
        console.log('Got a message' + message.getName());
        let next = false;
        let resp = null;
        function waitUserInput(e){
            while (next === false) setTimeout(() => {}, 50); // pause script but avoid browser to freeze ;)
            next = false; // reset var
            console.log('user input detected');
            e.call();
        }
        let id = this.message++;
        $('#requestResponseResponses').append("<div id='div" + id + "'>" + message.getName() + " <input type='text' id='response " + id +"'/><button id='btn" + id + "'>Response</button>");
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
            waitUserInput(() => subscriber.onComplete(resp));
        });
    };
}

//DefaultHelloService.constructor = DefaultHelloService;

module.exports = {DefaultHelloService};
