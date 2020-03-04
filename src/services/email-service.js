'user strict';

const config = require('../config');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(config.sendgridkey);

//# Include the SendinBlue library
const SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
//Instantiate the client
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.sendinbluekey;

exports.send = async (to, subject, body) => {
	sendgrid.send({
		to: to,
		from: 'nodeapi@gmail.com',
		subject: subject,
		html: body
	});
}