var movieController = function () {
  var getUpcomingMovies = function (req, res) {
     console.log('controller')
    res.send('<h2>Upcoming movies</h2>');
  };

  return {
    getUpcomingMovies:getUpcomingMovies
  };
};

module.exports = movieController;


