const app = require("./app")
const dotenv = require("dotenv");
const {sql, testConnection} = require('./dbConnection');

dotenv.config();

const port = process.env.PORT;


//test the database connection
(async () => {
try {
  // 1. test the database connection
  await testConnection();

  app.listen(port, () => {
    console.log(`App running on port ${port}`);
    
  })
}catch (error) {
  process.exit(1) //terminate running application if the database connection fails, 1 miens errror
}

process.on('SIGNT', async () => {
  console.log("Closing database connection ....");
   await sql.end();
   process.exit(0)
});
})();
