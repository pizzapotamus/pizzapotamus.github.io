const {HelloResponse, Empty} = require('./netifi/service_pb');
const {
    Single
} = require('rsocket-flowable');
let messageId = 0;
function DefaultHelloService(serviceName, logFunction) {
    this.serviceName = serviceName;

    this.sayHello = function (message) {
        let timeout = function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        };
        console.log("Got a message");
        let next = false;
        let resp = new HelloResponse();
        let id = messageId++;
        $('#requestResponseResponses').append("<div id='div" + id + "'>" + message.getName() + " <input type='text' id='response" + id +"'/><button id='btn" + id + "'>Response</button>");
        $("#btn" + id).on('click', function (e) {
            resp.setMessage($('#response' + id).val() + " from " + serviceName);
            console.log("set message");
            $('#div' + id).remove();
            next = true;
        });
        async function waitUserInput(e){
            while (next === false) await timeout( 50);
            next = false; // reset var
            console.log('user input detected');
            e.call();
        }
        return new Single(async subscriber => {
            subscriber.onSubscribe();
            await waitUserInput(() => subscriber.onComplete(resp));
        });
    };

    this.fireAndForget = function (message) {
        $('#fireAndForgetResponses').append("<li>" + message.getName() + " from " + serviceName + "</li>");
        return Single.of(new Empty());
    };
}

//DefaultHelloService.constructor = DefaultHelloService;

module.exports = {DefaultHelloService};
