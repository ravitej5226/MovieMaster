var express = require('express');

var movieRouter = express.Router();


var router = function () {
  console.log('router')
  var movieController = require('../controllers/movieController');
  movieRouter.route('/upcoming').get(movieController.getUpcomingMovies)
  movieRouter.route('/').get(movieController.getUpcomingMovies)

  return movieRouter;
};

module.exports = router;
