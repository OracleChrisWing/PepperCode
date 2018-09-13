// Allows us to track what question the user is currently on.
var currentQuestionIndex = 0;

// The score of the user!
var userScore = 0;

// Pre-define the initial question.
var initRandom = Math.floor((Math.random() * 11) + 1);;

// Keeps track of what numbers we have used.
var randomNumbers = [];
randomNumbers.push(initRandom);

// The initial question.
var randomNumber = initRandom;

// The number of possible quesitons the RNG can pick from.
var questionCount = 13;

module.exports = {
			
    metadata: function metadata() {
        return {
            "name": "TriviaGame",
            "channels": {
                "facebook": "1.0",
                "webhook": "1.0"
            },
            "properties": {
				
				"name" : {"type" : "string", "required" : true}
			},
            "supportedActions": []		
        };
    },
	
    invoke: function invoke(sdk, done) {
		
		// The name of the user playing the game.
		var userName = sdk.properties().name;

		
		// Output the question and list of options to the user.
		function outputPayload(index, questionArray, optionsArray, randomNumber){
			
			// create the buttons for each question in quiz
			const Joi = require("joi");
			const MessageModel = require("../MessageModel")(Joi);
			
			var answers = optionsArray[randomNumber].split(", ");
			
			var actions = [];
			var action1 = MessageModel.postbackActionObject(answers[0], "", answers[0]);
			var action2 = MessageModel.postbackActionObject(answers[1], "", answers[1]);
			var action3 = MessageModel.postbackActionObject(answers[2], "", answers[2]);
			
			actions.push(action1);
			actions.push(action2);
			actions.push(action3);
			
			var message = MessageModel.textConversationMessage("Okay Question: " + index + "! \n\r" + questionArray[randomNumber] + " ", actions);
			sdk.reply(message);
			done();
			
		}
		
		// Checks if the currently generated random number is unique or not.
		function isNotUnique(input, array){
			
			if(array.includes(input)){ return true; }
			else return false;
		}
		
		// The questions in here are not part of the random-trivia game.
		// Instead they are statically called at the same point each time regardless of anything else.
		var staticQuestions = {1 : "How many Cloud Partners do you think Oracle has?",
							   2 : "Which character in Game of Thrones was resurrected and became The King in the North?"};
		
		var staticOptions = {1 : "4000, 12000, 26000",
							 2 : "Jaqen H’ghar, John Snow, Jaimie Lannister"};
		
		
		var staticAnswers = {1 : "26000",
						     2 : "John Snow"};
		
		var staticFacts = {1 : "Oracle has over 26000 Cloud Partners, growing every day! To try out some of our services, pick up a free $500 Cloud Credit voucher today!",
						   2 : "Cool! That's the bonus round now over!"};
		
		// This contains the set of questions Pepper will as the user.
		var questionArray = {1 : "What was the first video game ever created?",
							 2 : "What does YAML stand for?",
							 3 : "What was Java originally called?",
							 4 : "What is the estimated amount that Financial and Technology firms have invested in Blockchain in 2016?",
							 5 : "How many petabytes of data storage is there in Oracle data centres globally?",
							 6 : "What is 4 + 3 mod 5?",
							 7 : "What is the candy-bar themed codename for Android version 4.4?",
							 8 : "Who is the famous droid that accompanies R 2 D 2 in the origional Star Wars Trilogy?", 
							 9 : "How old is the Java programming language?",
							 10 : "On average how many gigabytes of audio data does a beehive generate on a daily basis?",
							 11 : "How many daily transactions does Oracle Cloud perform?",
							 12 : "How many Cloud Credits does every attendee of Oracle Code receive?",
							 13 : "How many missions are in the Oracle Dev Star workshop?"};
				
		// The options avaliable for each question.
		var optionsArray = {1 : "Pong, Space Invaders, Pacman",
							2 : "YAML Aint Markup Language, Yet Another Markup Language, You're Another Meaningful Language",
							3 : "Oak, Spruce, Latte",
							4 : "$750 million, $1.4 Billion, $2 Billion",
							5 : "500, 700, 900",
							6 : "2, 6, 7",
							7 : "Mars, Aero, Kit-Kat",
							8 : "C-3PO, BB8, R5-D4",
							9 : "22 years, 25 years, 19 years",
							10 : "2, 6, 10",
							11 : "700 Million, 5 Billion, 33 Billion",
							12 : "200, 300, 500",
							13 : "2, 5, 8"};
					
		// This contains the correct answer for each question.
		var answerArray = {1 : "Pong",
						   2 : "YAML Aint Markup Language",
						   3 : "Oak",
						   4 : "1.4 Billion",
						   5 : "700",
						   6 : "7", 
						   7 : "Kit-Kat",
						   8 : "C-3PO",
						   9 : "22 years",
						   10 : "2",
						   11 : "33 Billion", 
						   12 : "500", 
						   13 : "5"};
	
		// The fact that is associated to eadch question.
		var factsArray = {1 : "Pong was the first video game to be created in 1958 by the Physicist William Higinbotham. Don’t forget to check out some of the games we have including Dev Star built using our Container Service and automated deployment pipelines!",
						  2 : "Originally YAML was said to mean Yet Another Markup Language, but it was then repurposed as YAML Ain’t Markup Language, a recursive acronym to distinguish it as being data-orientated.\n\r\n\rDid you know most of my conversational logic is scripted using YAML on Oracle’s Intelligent Bot Platform!",
						  3 : "The Oak language was created by James Gosling in 1991 and named after an Oak Tree that stood outside his office window. The Oak language later evolved to what we know as Java today.\n\rDon’t forget to check out the Distributed Deep Learning using Java session on data privacy!",
						  4 : "Financial and Technology companies invested $1.4 Billion in to Blockchain. Don’t forget to check out the session on Building a chatbot for Blockchain transactions and serverless functions.",
						  5 : "Oracle has a full stack Cloud, meaning that it has a product catalogue covering IaaS, PaaS, SaaS & DaaS.",
						  6 : "The order of precidence is Mod and then plus! Hence the expression is equal to 7. 3 mod 5 is 3; plus 4 is 7.",
						  7 : "With Oracles Intelligent Bot Platform Android apps can be integrated out of the box using simple webhooks.",
						  8 : "Much like C-3PO, Oracles Intelligent Bot platform allows intelligent bots to be intergrated into hardware devices such as me; Pepper!",
						  9 : "Java first appeared	on May 23; 1995; 22 years ago.",
						  10 : "This figure is based on a smart beehive that monitors the health of the bees over a 24 hour period! To learn more on this, check out the WorldBeeProject stand here at Oracle Code! Its pretty cool!",
						  11 : "Oracle Cloud Platform is growing every day; there over 70 Million users that make over 33 Billion daily transactions.",
						  12 : "The correct answer is $500 as all attendees of Oracle Code get an increased amount of credit to try out our cloud services. Ordinarily everyone is entitled to $300. Want to learn more about how to start your trial, speak to the Cloud Trials Team in the Developer Lounge today.",
						  13 : "There’s a total of 5 mini coding mission in this workshop. Why not have a go today and become and Oracle Dev Star!"};
		
				
		// This is the call-back value (What the user is re-inputting back into Papper).
		var payload = sdk.text();
		
		// We have asked 4 questions or less.
		if(currentQuestionIndex <= 4){
			
			// If the user has replied to the Bot.
			if(payload === answerArray[randomNumber]){
			
				// Output to the user that they got the current question correct!
				sdk.reply("Congratulations, you got Question " + currentQuestionIndex + " correct!");
				
				// Outputs the facts associated to the last question.
				sdk.reply(factsArray[randomNumber]);
				
				// Move to next question.
				currentQuestionIndex++;
				
				// The current question index.
				randomNumber = Math.floor((Math.random() * questionCount) + 1);
				
				// We must check that the new random index is unique, if it isnt we keep generating more.
				while(isNotUnique(randomNumber, randomNumbers)){
					
					randomNumber = Math.floor((Math.random() * questionCount) + 1);
				}
		
				// Now we have a unique, add to the list.
				randomNumbers.push(randomNumber);
				
				// The user got this question right, therefore add one to the score.
				userScore++;
				
				if(currentQuestionIndex <= questionArray.length){
					
					// Get the user ready for nect question.
					sdk.reply("Prepare for Question: " + currentQuestionIndex);
				}
			}
			// What they said was wrong...
			else{
				
				// We havent started yet, therefore give the intro message.
				if(currentQuestionIndex == 0){
					
					sdk.reply("Great! Thanks " + userName + " We are about to begin! Hope you have fun! Get ready for the first question.");
					currentQuestionIndex++;
				}
				else{
					
					// Wrong answer!
					sdk.reply("Oops that was the wrong answer!");
					
					sdk.reply(factsArray[randomNumber]);
					
					// Move to next question.
					currentQuestionIndex++;
					
					// The current question index.
					randomNumber = Math.floor((Math.random() * questionCount) + 1);
					
					// We must check that the new random index is unique, if it isnt we keep generating more.
					while(isNotUnique(randomNumber, randomNumbers)){
						
						randomNumber = Math.floor((Math.random() * questionCount) + 1);
					}
					
					// Now we have a unique, add to the list.
					randomNumbers.push(randomNumber);
					
					// Get the user ready for nect question.
					sdk.reply("Preparing for Question: " + currentQuestionIndex);
				}
			}
		}
		// We are now onto the 5th and potentially bonus question.
		else{
			
			if(payload === staticAnswers[1]){
				
				sdk.reply("Congratulations, you got that one correct! \n\r\n\r" + staticFacts[1]);
				// Move to next question.
				currentQuestionIndex++;
				
				// The user got this question right, therefore add one to the score.
				userScore++;
			}
			// Maybe they get to the bonus question?
			else if(payload === staticAnswers[2]){
				
				sdk.reply("Congratulations, you got the bonus question correct!");
				sdk.reply(staticFacts[2]);
				
				// The user got this question right, therefore add one to the score.
				userScore++;
				
				sdk.reply("Well done " + userName + ", the quiz is now over. \n\r\n\r You scored: " + userScore + "/6");
				
				// Sends the score back to the bot.
				sdk.variable("userScore", userScore.toString());
				sdk.variable("numberOfQuestions", "6");
				
				// Reset user values ready for the next person.
				currentQuestionIndex = 0;
				userScore = 0;
				randomNumbers = [];
				randomNumber = Math.floor((Math.random() * questionCount) + 1);
				
				sdk.transition();
				sdk.keepTurn(true);
				done();
			}
			else{
				
				if(currentQuestionIndex > 1 && currentQuestionIndex < 6){
					
					sdk.reply("Oh no! Looks like you got that one wrong!");
					
					// Move to next question.
					currentQuestionIndex++;
				}
				else{
					
					// The user got the bonus question wrong.... Oh dear!
					sdk.reply("Well done " + userName + ", the quiz is now over. \n\r\n\r You scored: " + userScore + "/6");
					
					// Sends the score back to the bot.
					sdk.variable("userScore", userScore.toString());
					sdk.variable("numberOfQuestions", "6");
					
					// Reset user values ready for the next person.
					currentQuestionIndex = 0;
					userScore = 0;
					randomNumbers = [];
					randomNumber = Math.floor((Math.random() * questionCount) + 1);
					
					sdk.transition();
					sdk.keepTurn(true);
					done();
				}
			}
		}

		// Keep asking questions.
		if(currentQuestionIndex <= 4){
			
			outputPayload(currentQuestionIndex, questionArray, optionsArray, randomNumber);
		}
		// End of quiz.
		else if(currentQuestionIndex > 5){
			
			// Activate bonus question
			if(userScore > 2){
				
				// create the buttons for each question in quiz
				const Joi = require("joi");
				const MessageModel = require("../MessageModel")(Joi);
				
				var answers = staticOptions[2].split(", ");
				
				var actions = [];
				var action1 = MessageModel.postbackActionObject(answers[0], "", answers[0]);
				var action2 = MessageModel.postbackActionObject(answers[1], "", answers[1]);
				var action3 = MessageModel.postbackActionObject(answers[2], "", answers[2]);
				
				actions.push(action1);
				actions.push(action2);
				actions.push(action3);
				
				var message = MessageModel.textConversationMessage("Woop woop! Well done for reaching this far in the Oracle Code Trivia! You have suceeded in unlocking the secret bonus question. Prepare for the ultimate challenge. " + staticQuestions[2] + " ", actions);
				sdk.reply(message);
				done();
				
				
			}
			// User did rubbish, therefore just display their score.
			else{

				sdk.reply("Ahh no, well done for reaching this far but you didn’t score high enough to unlock the bonus question! Come back and try again later. Thanks " + userName + ", the quiz is now over. \n\r\n\r You scored: " + userScore + "/5");
				
				// Sends the score back to the bot.
				sdk.variable("userScore", userScore.toString());
				sdk.variable("numberOfQuestions", "5");
				
				// Reset user values ready for the next person.
				currentQuestionIndex = 0;
				userScore = 0;
				randomNumbers = [];
				randomNumber = Math.floor((Math.random() * questionCount) + 1);
				
				sdk.transition();
				sdk.keepTurn(true);
				done();
			}
		}
		else if(currentQuestionIndex > 4){
			
			// Cloud credit question.
			
			// create the buttons for each question in quiz
			const Joi = require("joi");
			const MessageModel = require("../MessageModel")(Joi);
			
			var answers = staticOptions[1].split(", ");
			
			var actions = [];
			var action1 = MessageModel.postbackActionObject(answers[0], "", answers[0]);
			var action2 = MessageModel.postbackActionObject(answers[1], "", answers[1]);
			var action3 = MessageModel.postbackActionObject(answers[2], "", answers[2]);
			
			actions.push(action1);
			actions.push(action2);
			actions.push(action3);
			
			var message = MessageModel.textConversationMessage("Okay time for Question: " + currentQuestionIndex + "! " + staticQuestions[1] + " ", actions);
			sdk.reply(message);
			done();
		}		
    }
};