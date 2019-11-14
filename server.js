const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require('./config/db');

//Load env vars
dotenv.config({
  path: "./config/config.env"
});

//Connect DB
connectDb();

const app = express();

//Route Files
const bootcamps = require("./routes/bootcamps");

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise)=>{
  console.log(`Error: ${err.message}`);
  //Close server and exit
  server.close(()=>{
    process.exit(1);
  });
})
