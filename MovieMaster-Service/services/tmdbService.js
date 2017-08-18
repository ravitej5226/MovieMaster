var request = require("request");
var userSecrets = require('../usersecrets.config.dev')
var Enumerable = require('linq')

var tmdbService = function () {
  var getUpcomingMovies = function (callback) {
    var options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      qs:
      {
        with_original_language: 'en',
        primary_release_year: '2017',
        page: '1',
        include_video: 'false',
        include_adult: 'false',
        sort_by: 'release_date.desc',
        language: 'en-US',
        api_key: userSecrets.moviedb_api_key
      },
      body: '{}'
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(JSON.parse(body).success == false)

      if (JSON.parse(body).success == false) {
        callback(body, null)
        return;
      }

      var movies = [];
      Enumerable.from(JSON.parse(body).results).forEach(function (item) {
        movies.push(item.title);
      })
      callback(error, movies);
    });


  }

  var getRecentMovies = function (callback) {
    var request = require("request");

    var options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing',
      qs:
      {
        page: '1',
        language: 'en-US',
        api_key: userSecrets.moviedb_api_key
      },
      body: '{}'
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      if (JSON.parse(body).success == false) {
        callback(body, null)
        return;
      }

      var movies = [];
      Enumerable.from(JSON.parse(body).results).forEach(function (item) {
        movies.push(item.title);
      })
      callback(error, movies);


    });
  }


  var getSummary = function (query, callback) {

    // Search for a movie and get the id
    var options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      qs:
      {
        include_adult: 'false',
        page: '1',
        query: query,
        language: 'en-US',
        api_key:  userSecrets.moviedb_api_key
      },
      body: '{}'
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      if (JSON.parse(body).success == false) {
        callback(body, null)
        return;
      }

      // Search the first result and get all the movie information\
      var options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/297762',
        qs:
        {
          language: 'en-US',
          api_key:  userSecrets.moviedb_api_key
        },
        body: '{}'
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

       callback(error, JSON.parse(body));
      });



    });

  }

  return {
    getUpcomingMovies: getUpcomingMovies,
    getRecentMovies: getRecentMovies,
    getSummary: getSummary
  }
}

module.exports = tmdbService();


