const {HelloResponse} = require('./netifi/service_pb');
const {
    Single
} = require('rsocket-flowable');
let messageId = 0;
function DefaultHelloService(serviceName, logFunction) {
    this.serviceName = serviceName;

    this.sayHello = function (message) {
        console.log("Got a message");
        let next = false;
        let resp = new HelloResponse();
        let id = messageId++;
        $('#requestResponseResponses').append("<div id='div" + id + "'>" + message.getName() + " <input type='text' id='response " + id +"'/><button id='btn" + id + "'>Response</button>");
        $("#btn" + id).on('click', function (e) {
            resp.setMessage("Hello, " + message.getName() + "! from " + serviceName);
            console.log("set message");
            next = true;
        });
        function waitUserInput(e){
            while (next === false) setTimeout(() => {}, 50); // pause script but avoid browser to freeze ;)
            next = false; // reset var
            console.log('user input detected');
            e.call();
        }
        resp.setMessage("derp");
        return new Single(subscriber => {
            subscriber.onSubscribe();
            waitUserInput(() => subscriber.onComplete(resp));
        });
    };
}

//DefaultHelloService.constructor = DefaultHelloService;

module.exports = {DefaultHelloService};
