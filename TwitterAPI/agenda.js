var request = require('request');
var form_to_send = {};

module.exports = {

    metadata: function metadata() {
        return {
            "name": "agenda",
            "channels": {
                "facebook": "1.0",
                "webhook": "1.0"
            },

            "properties": {
				"time": {"type":"string", "required":true} 
				
            },
            "supportedActions": []
        };
      },



        invoke: function invoke(sdk, done) {

			sdk.reply("Okay one moment! Let me find out for you. ...");
			
			var hour = sdk.properties().time;
			
			var times = ["9", "10", "11", "12", "2", "3", "4", "6"];
					
			var agenda = { 
						9: "Speaking at 9 A M is Martin Thompson on High Performance managed languages. He is a high performance and low latency computing specialist from Real logic. If you miss this keynote you'll have the chance to check it out online!",
						10: "Speaking at 10 A M is James Allerton Austin on Chatbots, Blockchain and Serverless Functions A P I, who is a senior director and works in Cloud Platform product management at Oracle. This will be a great keynote! But if you've missed it, you can check it out online!",
						11: "At eleven fifteen A M we have Ron Pressler speaking on Shaping the Future of Java, who is a Member of Technical Staff from Oracle, we have Ewan Slater speaking on Honey I shrunk the container, who is a master principal sales consultant at Oracle, and we Johan Vos the C T O of Gluon speaking on Distributed Deep Learning Using Java. Holy moly what a great line up!",
						12: "At twelve ten P M we have Dan Mcghan from Oracle speaking on Building real time data in web apps with node J S, there is also Andre Boa-ventura speaking on, With Container Native Power Comes Great Responsibility, and Susan Duncan, Senior Principal Product Manager at Oracle, speaking on Database, Dev Ops and Agile Development. Holy moly what a great line up!",
						2: "At one fifty five P M, Robert van Molken, a senior integration specialist, will be taking you through Building a decentralized blockchain app with Hyperledger! Wow! This sounds interesting.",
						3: "At two fifty P M we have Mark Swarbrick from Oracle on creating modern apps. We also have Phil Wilkins from Cap Gemini speaking on microservices. And Linus Hakansson from Oracle speaking on In the life of a robot. Jeepers! What a great line up this afternoon!",
						4: "At 4 P M we have Thom Leggett and Matthew Gilliard from Oracle speaking on democratising serverless and the amazing open source F N project, we also have Ami Aharonovich speaking on Exploring Best Practices for Protecting Data. Wow! That sounds awesome!",
						6: "To finish off this great event we've got the very talented Doctor Sue Black who is a technology evangelist speaking in the Auditorium. Be sure not to miss this one!"
			};
			
			if (times.includes(hour)) {
				sdk.reply(agenda[parseInt(hour)]);
			} else {
				sdk.reply("Currently no one is speaking at this time, however there are loads of hands on labs and cool demos for you to check out in the developer lounge!");
			}

			sdk.transition();
			done();
        }


};
