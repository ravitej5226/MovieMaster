var movieService=require('../services/tmdbservice');

var movieController = function () {
  var getUpcomingMovies = function (req, res) {
    res.send(movieService.getUpcomingMovies())

  };

  return {
    getUpcomingMovies: getUpcomingMovies
  };
};

module.exports = movieController;


