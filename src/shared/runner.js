const {DefaultHelloService} = require("./DefaultHelloService");

const {HelloRequest} = require('./netifi/service_pb');
const {HelloServiceClient, HelloServiceServer} = require('./netifi/service_rsocket_pb');
const {Netifi} = require('netifi-js-client');
const generateName = require('./nameGenerator');
const QUICKSTART_SERVICE_NAME = "com.netifi.quickstart.service.HelloService";

let connection;

function runHello(isServer, logFunction) {

    const groupName = isServer ? "innovate.servers" : "quickstart.clients";
    const destinationName = isServer ? generateName() : "client1";

    logFunction('Connecting gateway with group ' + groupName + ' and destination ' + destinationName);

    const netifiGateway = Netifi.create({
        setup: {
            group: groupName,
            destination: destinationName,
            accessKey: 9007199254740991,
            accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
        },
        transport: {
            url: "ws://localhost:8101/",
            // url: "wss://rsocket-demo.herokuapp.com/ws",
        },
    });

    netifiGateway.addService(QUICKSTART_SERVICE_NAME, new HelloServiceServer(new DefaultHelloService(destinationName, logFunction)));
    netifiGateway._connect();
    // Connect to Netifi Netifi Platform
    connection = netifiGateway.group("innovate.servers");
    console.log("Ran hello successfully")
}


async function requestResponse(input, logFunction) {
    const client = new HelloServiceClient(connection);
    // Create Request to HelloService
    const request = new HelloRequest();
    request.setName(input);

    // Call the HelloService
    client.sayHello(request).subscribe({
        onComplete: response => {
            console.log("got a response ! " + response.getMessage());
            $('#requestResponseResponses').append("<div>" + input + " : " + response + "</div>");
        },
        onError: error => {
            logFunction("Error: " + error);
        }
    });
}

async function requestFireForget(input, logFunction) {
    const client = new HelloServiceClient(connection);
    // Create Request to HelloService
    const request = new HelloRequest();
    request.setName(input);

    $('#fireAndForgetResponses').append("<li>" + input + "</li>");

}

module.exports = {runHello, requestResponse, requestFireForget};
