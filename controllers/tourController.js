// const tours = require("../models/tourModel");
const {getAllTours, getTourById, postTour, update } =require("../models/tourModel")


exports.getAllTours = async (req, res) => {
try {
  const tours = await getAllTours();
  res.status(200).json({
    status: 'success',
    data: tours,
  })
} catch (error) {
  res.state(500).json({
  status: "fail",
  message: error.message,
  });
}

    res.status(200).json({
      // gali būti fail arba error
      status: "success",
      date: req.requestedTime,
      data: tours,
      
    });
  };




exports.getTour = async (req, res) => {
  try {
    const {id} = req.params;
    const tour =  await getTourById(id);
        if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    } res.status(200).json({
      status: "sucess",
      data: tour,
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    })
  }
    const id = +req.params.id;
    // const tour = tours.find((tour) => tour.id === id);
    res.status(200).json({
      status: "success",
      data: tour,
    });
  };
  
  // POST
  exports.postTour = async (req, res) => {
    try {
    const tour = req.body;
    // const newID = newTour[tours.length - 1].id + 1;
    const newTour = await postTour(tour);
res.status(200).json({
  status:"success",
  data: newTour,
});
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message
      })
    }
};

  // UPDATE
  exports.updateTour = async (req, res) => {
    
    try{
      const tour = req.body;
      const updatedTour = await update(req.id, req.body)
      res.status(200).json({
        status:"success",
        data: newTour,
      });
          } catch (error) {
            res.status(500).json({
              status: "fail",
              message: error.message
            })
          }
      };


  

  