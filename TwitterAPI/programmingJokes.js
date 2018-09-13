var request = require('request');
var form_to_send = {};

module.exports = {

    metadata: function metadata() {
        return {
            "name": "programmingJokes",
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
  
			var jokes = [
						"What is a programmer's favourite hang out place? ... Foo Bar!",
						"Why did the programmer quit his job? ... Because he didn't get arrays!",
						"Why do Java programmers have to wear glasses? ... Because they don't C sharp!",
						"Knock Knock. ... Race condition, who's there?",
						"Java and C were telling jokes. It was C's turn, so he writes something on the wall, points to it and says do you get the reference? But Java didn't.",
						"In order to understand recursion you must first understand recursion.",
						"Why do programmers take so long in the shower? ... They read the directions on the shampoo bottle and follow them to the letter: Lather, rinse, and repeat.",
						];
						
			var rand = Math.floor(Math.random() * jokes.length);
			
			sdk.reply(jokes[rand]);
			sdk.transition();
			done();
        }


};
