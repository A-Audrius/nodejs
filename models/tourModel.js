
const { sql } = require("../dbConnection");

exports.getAllTours = async () => {
    const tourList = await sql`
    SELECT tours.name, 
    categories.name,
    difficulty,
    tours.price
    FROM tours
    JOIN difficulty ON tours.difficulty_id=difficulty.id
    JOIN categories ON tours.category_id = categories.id
    `;
    return tourList;
};

exports.getToursByCat =async (categotyId) => {
    const tourList = await sql`
    SELECT tours.name, 
    categories.name,
    difficulty.level,
    tours.price
    FROM tours
    JOIN difficulty ON tours.difficulty_id=difficulty.id
    JOIN categories ON tours.category_id = categories.id
    WHERE tours.category_id=${categotyId}
    `;
    return tours;

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


exports.countToursByCat = async () => {
    const tours = await sql`
    SELECT 
    categories.name AS category,
    COUNT(tours.id) AS totalCounts,
    FROM tours
    JOIN categories ON tours.category_id=categories.id
    GROUP BY categories.name
    `;
  };

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


// FILTER
exports.filterTours = async () => {
    const tours = await sql`
    SELECT tours.*, difficulty.name as difficulty, categories.title as category
    FROM tours
    JOIN difficulty ON tours.difficulty = difficulty.id
    JOIN categories ON tours.category = categories.id
    WHERE
    tours.duration <= ${filter.duration} 
    AND difficulty.name = ${filter.difficulty} 
    AND tours.price <= ${filter.price}  
   `;
    return tours;
}
