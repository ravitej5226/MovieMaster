var express = require('express');

var movieRouter = express.Router();


var router = function () {

  var movieController = require('../controllers/movieController')();

  movieRouter.route('/').get(movieController.getUpcomingMovies)
  movieRouter.route('/upcoming').get(movieController.getUpcomingMovies)

  return movieRouter;
};

module.exports = router();
