// const tours = require("../models/tourModel");
const {getAllTours, getTourById, postTour, update, getToursByCat, filterTours } =require("../models/tourModel")


exports.getAllTours = async (req, res) => {
try {
  const tours = await getAllTours();
  res.status(200).json({
    status: 'success',
    data: tours,
  })
} catch (error) {
  res.status(500).json({
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
  
exports.getToursByCategoryId = async (reg, res) => {
  try {
    const {categoryId} =reg.params;

    if (!categoryId || isNaN(categoryId)){
   return res.status(400).json({
        status: "fail",
        message: "invalid or missing ID",
      });
    }

    const tours = await getToursByCat(categoryId);
    res.status(200).json({
      status: "success",
      message: tours
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    })
  }
}

exports.countToursByCat = async (reg, res) => {
  try {
    const {categoryName} = reg.params;
const countByCat = await getToursByCat(name);
    if (!categoryName){
   return res.status(400).json({
        status: "fail",
        message: "invalid or missing name",
      });
    }

    const tours = await getToursByCat(categoryId);
    res.status(200).json({
      status: "success",
      message: countByCat,
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    })
  }
}



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


      // exports.getFilteredTours = (reg, res) => {
      //   try {
      //     const filter = req.query;
      //     const getFilteredTours = filterTours(filter);

      //      console.log(filteredTours);
      //   } catch (error) {
      //     res.status(500).json({
      //       status: "fail",
      //       message: error.message
      //     })
      //   }
      // };


//2. filter tours using query string
exports.getFilteredTours = async (req, res) => {
  try {
    const filter = req.query;
    console.log(filter);

    // If no query string, return all tours
    if (Object.keys(filter).length === 0) {
      const tours = await getAllTours();
      res.status(200).json({
        status: 'success',
        data: tours,
      });
      return;
    }

    // Validate filter fields
    const allowedFields = ['duration', 'difficulty', 'price', 'sort'];
    for (const key of Object.keys(filter)) {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({
          status: 'fail',
          message: `Invalid filter field: '${key}'. Allowed fields are: ${allowedFields.join(
            ', '
          )}`,
        });
      }
    }

    // Validate numeric parameters
    if (!Number(filter.duration) || filter.duration < 0) {
      throw new Error('Invalid duration');
    }
    if (!Number(filter.price) || filter.price < 0) {
      throw new Error('Invalid price');
    }

    // Validate difficulty against allowed values
    const validDifficulties = ['easy', 'medium', 'difficult'];
    if (!validDifficulties.includes(filter.difficulty)) {
      throw new Error('Invalid difficulty');
    }

    // If query string, return filtered tours
    const filteredTours = await filterTours(filter);

    res.status(200).json({
      status: 'success',
      data: filteredTours,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

        

      



    


  