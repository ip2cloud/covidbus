let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {

    let receiver = event['receiver'];
    let sender = event['sender'];
    let message = event['message'];

    console.log("Sending message", message, "to receiver", receiver);

    try {
        let data = await sns.publish({
            Message: message,
            PhoneNumber: receiver,
            MessageAttributes: {
                'AWS.SNS.SMS.SMSType': {
                    DataType: "String",
                    StringValue: "Transactional"
                },
                'AWS.SNS.SMS.SenderID': {
                    DataType: "String",
                    StringValue: sender
                }
            }
        }).promise();


    } catch (err) {
        // error handling goes here
    };


    return { "message": "Successfully executed" };
};