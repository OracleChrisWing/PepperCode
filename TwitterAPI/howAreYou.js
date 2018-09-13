var request = require('request');
var form_to_send = {};

module.exports = {

    metadata: function metadata() {
        return {
            "name": "howAreYou",
            "channels": {
                "facebook": "1.0",
                "webhook": "1.0"
            },

            "properties": {
				
            },
            "supportedActions": []
        };
      },



        invoke: function invoke(sdk, done) {
  
			var response = [
						"I'm doing all good thanks! What about you?",
						"I'm good! How are you doing?",
						"I'm doing alright, it's quite a long day today! How are you?",
						"Ahhhh I'm not too bad thanks, how are you?",
						"I'm doing great thanks! How you doing?"
						];
						
			var rand = Math.floor(Math.random() * response.length);
			
			sdk.reply(response[rand]);
			sdk.transition();
			done();
        }


};
