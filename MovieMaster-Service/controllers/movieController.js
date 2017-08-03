var movieService = require('../services/tmdbservice');

var movieController = function () {
  var getUpcomingMovies = function (req, res) {
    movieService.getUpcomingMovies(function(err,results){
      serviceCallback(err,results,res);
    });

  };

  var getRecentMovies=function(req,res){
      movieService.getUpcomingMovies(function(err,results){
      serviceCallback(err,results,res);
    });
  };

  function serviceCallback(err, results,res) {
    if (!err) {
      res.send(results);
    }
    else {
      res.send(err)
    }
  }
  return {
    getUpcomingMovies: getUpcomingMovies,
    getRecentMovies:getRecentMovies
  };
};

module.exports = movieController;


