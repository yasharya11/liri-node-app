require("dotenv").config();
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;

client.get('statuses/user_timeline', 'LilTrayn', function (error, tweets, response) {
    if (error) throw (error);

    for (var i = 0; i < tweets.length; i++) {
        console.log('TWEET NUMBER: ' + (i + 1));
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
    }
});

spotify.search({ type: 'track', query: 'My Search', limit: 20 }, function (err, data) {
    if (err) {
        return console.log("asdfASSSS");
    }

    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].external_urls.spotify);
    console.log(data.tracks.items[0].album.name);
});

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Release Year: " + JSON.parse(body).Year);
    }
});

console.log("End of program!");


var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("movies.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

});