var request = require('request');
var form_to_send = {};
var https = require('https');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "feed",
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

			var headers = {
			  'User-Agent': 'Coding Defined',
			  Authorization: 'Bearer ' + require('./oauth.json').access_token
			};

			function jsonHandler(response, callback) {
			  var json = '';
			  response.setEncoding('utf8');
			  if(response.statusCode === 200) {
				response.on('data', function(chunk) {
				  json += chunk;
				}).on('end', function() {
				  callback(JSON.parse(json));
				});
			  } else {
				console.log('Error : ' + reseponse.statusCode);
			  }
			};

			var trendOptions = {
			  host: 'api.twitter.com',
			  path: '/1.1/trends/place.json?id=23424848',
			  headers: headers
			};

			var tweetDetails = {
			  maxresults: 10,
			  resultType: 'recent',
			  options: {
				host: 'api.twitter.com',
				headers: headers,
			  }
			};

			function callTwitter(options, callback){
			  https.get(options, function(response) {
				jsonHandler(response, callback);
			  }).on('error', function(e) {
				console.log('Error : ' + e.message);
			  })
			};

			function fullTweetPath(query) {
			  var path = '/1.1/search/tweets.json?q=%OracleCode';
			  tweetDetails.options.path = path; 
			};

			callTwitter(trendOptions, function(trendsArray) {
			  fullTweetPath();
			  callTwitter(tweetDetails.options, function(tweetObj) {
				tweetObj.statuses.forEach(function(tweet) {
				  console.log('\n' + tweet.text);
				  sdk.reply(JSON.stringify('\n' + tweet.text));
				})
			  })
			});

			sdk.transition();
			done();
        }


};