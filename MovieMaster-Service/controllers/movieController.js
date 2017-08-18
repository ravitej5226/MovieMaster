var movieService = require('../services/tmdbservice');

var movieController = function () {
  var getUpcomingMovies = function (req, res) {
    movieService.getUpcomingMovies(function(err,results){
      serviceCallback(err,results,res);
    });

  };

  var getRecentMovies=function(req,res){
      movieService.getRecentMovies(function(err,results){
      serviceCallback(err,results,res);
    });
  };

   var getSummary=function(req,res){

      movieService.getSummary(req.params.item,function(err,results){
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
    getRecentMovies:getRecentMovies,
    getSummary:getSummary
  };
};

module.exports = movieController;


