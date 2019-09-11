const {runHello} = require('../../shared/runner');

function addMessage(message) {
    var ul = document.getElementById('messages');
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    if (ul.childElementCount >= 10) {
        ul.removeChild(ul.childNodes[0]);
    }
    ul.appendChild(li);
}

$('#fireAndForgetBtn').on('click', function (e) {
    let input = $('#fireAndForgetArea');
    $('#fireAndForgetResponses').append("<li>" + input.val() + "</li>");
    input.val('');
});
$('#fireAndForgetClearMessagesBtn').on('click', function (e) {
    $('#fireAndForgetResponses').empty();
});

$('#requestResponseBtn').on('click', function (e) {
    let input = $('#requestResponseArea');

    //todo call rsocket and get id
    let id = 5;
    $('#requestResponseResponses').append("<div id='div- " + id + "'>" + input.val() + " <input type='text' id='response'" + id + "/><button id=" + id + ">Response</button>");
    input.val('');
});
$('#requestResponseClearMessagesBtn').on('click', function (e) {
    $('#requestResponseResponses').empty();
});

//Run the Hello Service, "as server" injected by config, false by default. Client subscriber injected
runHello(__AS_SERVER__, addMessage);
