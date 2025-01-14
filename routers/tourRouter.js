const express = require("express");
const tourController = require("../controllers/tourController");
const {deleteMidleware} = require("../middlewares/routeMiddlewares")

const { getAllTours, getTour, postTour, updateTour, getToursByCategoryId, getFilteredTours } = tourController

// ROUTES
const tourRouter = express.Router();

// aprasome routes
tourRouter.route('/').get(getAllTours).post(deleteMidleware, postTour);
tourRouter.route("/filter").get(getFilteredTours)
tourRouter.route('/:id').get(getTour).patch(updateTour);
tourRouter.route("/category/:categoryid").get(getToursByCategoryId);

module.exports = tourRouter;



