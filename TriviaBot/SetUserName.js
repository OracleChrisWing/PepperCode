module.exports = {
			
    metadata: function metadata() {
        return {
            "name": "SetUserName",
            "channels": {
                "facebook": "1.0",
                "webhook": "1.0"
            },


            "properties": {
				"qrCodeInfo": {"type":"string", "required":true}
			},
            "supportedActions": []		
        };
    },
	
    invoke: function invoke(sdk, done) {

		// This is the ID being send in from Pepper.
		//var payload = sdk.payload;
		var payload = sdk.properties().qrCodeInfo;
		console.log("here is the QR: " + JSON.stringify(payload));
		
		if(payload.length > 0){
			
			var readQR = payload.split("^");
			var userName = readQR[1];
			
		} else {
			
			userName = "friend";
			
		}
		
	
		//var payload = 1;
		//var id = payload;
		//var play = require('play');
		
		//var table = require('./names.json');
		
		/*for(var i = 0; i < table.length; i++){
		
			if (id == table[i].id) {
		
				sdk.reply("Great, thanks " + table[i].name + ". Okay let me get my questions together!");
				//play.sound('StartOfQuiz.mp3');
				
				/*var player = require('play-sound')(opts = {})

				player.play('StartOfQuiz.mp3', function (err) {
				if (err) throw err;
					console.log("Audio finished");
				}); */
				
				//sdk.variable("name", table[i].name.toString());
				/*sdk.variable("name", userName.toString());
				sdk.transition();
				sdk.keepTurn(true);
				
				done();
				break;
			}
		}*/
		
		sdk.variable("name", userName.toString());
		sdk.keepTurn(true);
		sdk.transition();
				
		done();
		
    }
};