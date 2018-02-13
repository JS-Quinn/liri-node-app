require("dotenv").config();
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');
var command = process.argv[2];
var title = process.argv[3];
const words = process.argv.slice(3);
const encodedTitle = words.join('+');

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
    spotify.search({ type: 'track', query: encodedTitle }, function(err, data) {
    console.log(data); 
    });
};

// ---------------------------------------
//             OMDB SEARCH            
//----------------------------------------

const queryUrl = 'http://www.omdbapi.com/?t=' + encodedTitle + '&y=&plot=short&apikey=trilogy';
const queryUrlDefault = 'http://www.omdbapi.com/?t=' + "Mr." + "Nobody" + '&y=&plot=short&apikey=trilogy';

if (command === "movie-this") {
        if (encodedTitle == false) {
            console.log(queryUrlDefault);
            request(queryUrlDefault, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Release Year: ' + JSON.parse(body).Year);
                console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
                console.log('Rotten Tomoatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
                console.log('Counrty of Origin: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors ' + JSON.parse(body).Actors);
                }
            });
        } else {
            request(queryUrl, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Release Year: ' + JSON.parse(body).Year);
                console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
                console.log('Rotten Tomoatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
                console.log('Counrty of Origin: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors ' + JSON.parse(body).Actors);
                }
            });
        }
    }

// ---------------------------------------
//            DO WHAT IT SAYS            
//----------------------------------------

if (command === "do-what-it-says") {
    fs.readFile('random.txt','utf8',  function(error, data) {
    if (error) {
        return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
    });
}
