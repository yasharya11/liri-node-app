function doStuff(nodeArgs) {
    require("dotenv").config();
    var request = require('request');
    var keys = require('./keys');
    var Twitter = require('twitter');
    var Spotify = require('node-spotify-api');

    var client = new Twitter(keys.twitter);
    var spotify = new Spotify(keys.spotify);


    if (nodeArgs[2] == "my-tweets") { ///////////////////////////////////////////////////////
        client.get('statuses/user_timeline', 'LilTrayn', function (error, tweets, response) {
            if (error) throw (error);

            for (var i = 0; i < tweets.length; i++) {
                console.log('TWEET NUMBER: ' + (i + 1));
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        });
    } else if (nodeArgs[2] == "spotify-this-song") { ///////////////////////////////////////////////////////
        var song = nodeArgs[3];

        spotify.search({ type: 'track', query: song, limit: 20 }, function (err, data) {
            if (err) {
                return console.log("asdfASSSS");
            }
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log(data.tracks.items[i].name);
                console.log(data.tracks.items[i].artists[0].name);
                console.log(data.tracks.items[i].external_urls.spotify);
                console.log(data.tracks.items[i].album.name);
            }
        });
    } else if (nodeArgs[2] == "movie-this") { ///////////////////////////////////////////////////////
        var movieName = nodeArgs[3];
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
            }
        });
    } else if (nodeArgs[2] == "do-what-it-says") { ///////////////////////////////////////////////////////
        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }

            console.log(data);

            var dataArr = data.split(",");
            dataArr.unshift("asdf");
            dataArr.unshift("asdf");
            console.log(dataArr);

            doStuff(dataArr)
        });
    } else { ///////////////////////////////////////////////////////
        console.log("That is some garbage")
    }

    console.log("End of program!");
};
var nodeArgs = process.argv;

doStuff(nodeArgs);