require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var command = process.argv[2];
var title = process.argv[3];

// ---------------------------------------
//             TWITTER SEARCH            
//----------------------------------------

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

if (command === 'my-tweets') {
    client.get('search/tweets', {q: 'ThequinnboxJoe'}, function(error, tweets, response) {
        console.log(tweets);
    });
}

// ---------------------------------------
//             SPOTIFY SEARCH            
//----------------------------------------

var spotify = new Spotify({
id: process.env.SPOTIFY_ID,
secret: process.env.SPOTIFY_SECRET
});

if (command === 'spotify-this-song') {
    spotify.search({ type: 'track', query: title }, function(err, data) {
    console.log(data); 
    });
};

// ---------------------------------------
//             OMDB SEARCH            
//----------------------------------------
