var CALLBELL_APP_NAME = "YOUR_APP_NAME";
var CALLBELL_ENDPOINT =
  "https://eu-wa-business-api.callbell.eu/gupshup/message";

function sendToCallbell(options, context, event, text, callback) {
  var payload = {
    app: CALLBELL_APP_NAME,
    type: "message",
    timestamp: event.messageobj.timestamp,
    version: 2,
    payload: {
      id: event.messageobj.id,
      type: "text",
      sender: {
        phone: event.messageobj.from,
        name: event.senderobj.display,
      },
      payload: {
        type: "text",
        text,
      },
    },
  };

  context.simplehttp.makePost(
    CALLBELL_ENDPOINT,
    JSON.stringify(payload),
    { "Content-Type": "application/json" },
    (context, event) => {
      callback(options, event, context);
    }
  );
}

function generateReport(context) {
  var data = context.simpledb.roomleveldata;

  return `Nombre: ${data.name}
		Identificación: ${data.id}
		Tipo: ${data.type}
		Telefono: ${data.phone}
		`;
}

module.exports.sendToCallbell = sendToCallbell;
module.exports.generateReport = generateReport;
