var express = require('express');

var movieRouter = express.Router();


var router = function () {

  var movieController = require('../controllers/movieController')();

  movieRouter.route('/').get(movieController.getUpcomingMovies)
  movieRouter.route('/upcoming').get(movieController.getUpcomingMovies)
  movieRouter.route('/recent').get(movieController.getRecentMovies)
  return movieRouter;
};

module.exports = router();
