// const fs = require("fs");
// const path = require("path");
// const dir = path.join(__dirname, "../data/tours-simple.json");

// const tours = JSON.parse(fs.readFileSync(dir));


// module.exports = tours;

// const { getAllTours } = require("../controllers/tourController");
const { sql } = require("../dbConnection");

exports.getAllTours = async () => {
    const tourList = await sql`
    SELECT tours.*
    FROM tours
    `;

    return tourList;
}

exports.getTourById = async (id) => {
    const tours = await sql`
    SELECT
    tours.*
    FROM tours
    WHERE tours.id = ${id}
    `
    return tours[0];
}



exports.postTour = async (tour) => {
    const columns = [
        "name",
        "description",
        "category",
        "price",
        "duration",
        "difficulty"
    ];
    const insertedTour = await sql`
    INSERT INTO tours ${sql(tour, columns)}
    RETURNING *
    `;
    return insertedTour[0];

}

exports.update = async (id, tour) => {
const columns = Object.keys(tour);
    const updatedTour = await sql`
    UPDATE tours SET ${sql(tour, columns)}
    
    where tours_id = ${ id }
     RETURNING *
    `;
  return newTours[0];
}