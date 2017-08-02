var movieService=require('../services/tmdbservice');

var movieController = function () {
  var getUpcomingMovies = function (req, res) {
    movieService.getUpcomingMovies(function(err,results){
      if(!err)
        {
      res.send(results);
        }
    else
      {
        res.send(err)
      }
    });

  };

  return {
    getUpcomingMovies: getUpcomingMovies
  };
};

module.exports = movieController;


