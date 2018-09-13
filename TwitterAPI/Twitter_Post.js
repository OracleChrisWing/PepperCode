var request = require('request');
var form_to_send = {};

module.exports = {

    metadata: function metadata() {
        return {
            "name": "Twitter_Post",
            "channels": {
                "facebook": "1.0",
                "webhook": "1.0"
            },

            "properties": {
				
				"name" : {"type":"string", "required": true},
				"userScore" : {"type":"string", "required": true},
				"numberOfQuestions" : {"type":"string", "required" : true},
				"takePicture" : {"type":"string", "required" : true},
				"imageFromPepper" :{"type":"string", "required" : true}

            },
            "supportedActions": ["yesPicture", "noPicture"]
        };
      },



        invoke: function invoke(sdk, done) {

			 var userName = sdk.properties().name;
			 var score = sdk.properties().userScore;
			 var totalQuestions = sdk.properties().numberOfQuestions;
			 var takePicture = sdk.properties().takePicture;
			 var userImage = sdk.properties().imageFromPepper;
			 
			 // Twitter Pictures
			var codeBannerBlue = 'https://i.imgur.com/GnG11sJ.jpg';
			var codeBannerRed = 'https://i.imgur.com/ysrvIca.jpg';
			var codePepper = 'https://i.imgur.com/Qy2EIcV.png';
			var pepperOne = 'https://i.imgur.com/82apStP.jpg';
			var pepperTwo = 'https://i.imgur.com/Bjhy9Cmr.jpg';
			var pepperThree = 'https://i.imgur.com/m6mnjNCr.jpg';
			var codePictures = [codeBannerBlue, codeBannerRed, codePepper, pepperOne, pepperTwo, pepperThree];
			var rand = Math.floor(Math.random() * codePictures.length);
			
			var tweetPicture;
			if (takePicture == "no" || takePicture == "No") {
				userImage = codePictures[rand];
	
			}
			
			var i2b = require("imageurl-base64");
			
			console.log("image before conversion: " + JSON.stringify(userImage));
			
			i2b(userImage, function(err, data){
				
				 console.log("data: " + JSON.stringify(data));
				
				 var convertedImage = data.base64;
				 console.log("the base64: " + JSON.stringify(convertedImage));
			
				 var twitterStatus = "";
				 if ((score == "${userScore.value}") && (takePicture == "no" || takePicture == "No")) {
					 // post to twitter, generic randomized picture, no quiz
					 twitterStatus = "Hey @OracleDevs it’s Pepper! We're live from #OracleCode in London!"
					 + " If you wanna learn more about #AI and #Chatbots come speak to me at my stand! #OracleCloud #OMCe";
					 
				 } else if ((score == "${userScore.value}") && (takePicture == "Yes" || takePicture == "yes")) {	 
					 // post to twitter, user picture, no quiz
					 //userpicture
					 twitterStatus = "Hey @OracleDevs it’s Pepper! Check out all the fun we're having at #OracleCode in London!"
					 + " If you wanna learn more about #AI and #Chatbots come speak to me at my stand! #OracleCloud #OMCe";
					 
				 } else if (score != null && (takePicture == "no" || takePicture == "No")) {		 
					 // post to twitter, generic randomized picture, yes quiz - name and score
					 twitterStatus = "Hey @OracleDevs it’s Pepper! I talked to " + userName + " who did the #OracleCode London Trivia"
					 + " with me and scored " + score + "/" + totalQuestions + " correct! Come check me out at my stand! #OracleCloud #OMCe";
					 
				 } else { 
					 // post to twitter user picture, yes quiz - name & score
					 //userpicture
					 twitterStatus = "Hey @OracleDevs it’s Pepper! I talked to " + userName + " who did the #OracleCode London Trivia"
					 + " with me and scored " + score + "/" + totalQuestions + " correct! Come check me out at my stand! #OracleCloud #OMCe";
				 }
				 
				 tweetPicture = convertedImage;
				 
				console.log("image after conversion: " + JSON.stringify(tweetPicture));
									
				var Twit = require('twit')

				var T = new Twit({
				  consumer_key:         '##',
				  consumer_secret:      '##',
				  access_token:         '##-##',
				  access_token_secret:  '##',
				  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
				})
				
				// first we must post the media to Twitter
				T.post('media/upload', { media_data: tweetPicture }, function (err, data, response) {
				
				  var mediaIdStr = data.media_id_string
				  var altText = "Small flowers in a planter on a sunny balcony, blossoming."
				  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

				  T.post('media/metadata/create', meta_params, function (err, data, response) {
					if (!err) {
					  // now we can reference the media and post a tweet (media will attach to the tweet)
					  var params = { status: twitterStatus, media_ids: [mediaIdStr] }

					  T.post('statuses/update', params, function (err, data, response) {
						console.log(data)
					  })
					}
				  })
				})
  
			// i2b
			});
			
			
			
			
			if (takePicture == "Yes" || takePicture == "yes") {
				sdk.reply("Awesome! I've tweeted! Check out the tweet at Oracle Mobile's Twitter page! Is there anything else I can help you with?");
				sdk.keepTurn(true);
				sdk.transition("yesPicture");
	
			} else {
				sdk.keepTurn(true);
				sdk.transition("noPicture");
		
			}
			
			done();
        }


};
