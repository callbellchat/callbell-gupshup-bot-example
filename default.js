const nodemailer = require("nodemailer");
const callbell = require("./callbell");

module.exports.common = {
  label_remd: (options, event, context, callback) => {
    context.simpledb.roomleveldata = {};
    callback(options, event, context);
  },
  label_talk: (options, event, context, callback) => {
    context.simpledb.roomleveldata.desactivateBot = false;
    callback(options, event, context);
  },
};

module.exports.questions = {
  label_geti: (options, event, context, callback) => {
    context.simpledb.roomleveldata.id = event.message;
    callback(options, event, context);
  },
  label_getn: (options, event, context, callback) => {
    context.simpledb.roomleveldata.name = event.message;
    callback(options, event, context);
  },
  label_getp: (options, event, context, callback) => {
    context.simpledb.roomleveldata.phone = event.message;
    callback(options, event, context);
  },
  label_gett: (options, event, context, callback) => {
    context.simpledb.roomleveldata.type = event.message;
    options.data.name = context.simpledb.roomleveldata.name;
    callbell.sendToCallbell(options, context, event, event.message, callback);
  },
};
