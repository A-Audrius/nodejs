const express = require("express");
const tourController = require("../controllers/tourController");
const {deleteMidleware} = require("../middlewares/routeMiddlewares")

const { getAllTours, getTour, postTour, updateTour } = tourController

// ROUTES
const tourRouter = express.Router();

// aprasome routes
tourRouter.route('/').get(getAllTours).post(deleteMidleware, postTour);
tourRouter.route('/:id').get(getTour).patch(updateTour);

module.exports = tourRouter