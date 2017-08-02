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
        api_key: userSecrets.default.moviedb_api_key
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

      var movies = ['test'];
      Enumerable.from(JSON.parse(body).results).forEach(function (item) {
        movies.push(item.title);
      })
      callback(error, movies);
    });

    return 'test'
  }

  return {
    getUpcomingMovies: getUpcomingMovies
  }
}

module.exports = tmdbService();


