module.exports = {
	twilio: {
		mobiles: ['MY_PHONE_NUMBER', 'MY_OTHER_PHONE_NUMBER'],
		enabled: false,
		accountSid: 'MY_TWILIO_SID',
		authToken: 'MY_TWILIO_AUTH_TOKEN',
		number: 'MY_TWILIO_NUMBER'
	},
	endpoints: [
		{
			name: 'BING',
			responseTimeout: 1000,
			protocol: 'http',
			request: {
				hostname: 'www.bing.com',
				port: 80,
				path: '/',
				method: 'GET'
			}
		}
	]
};