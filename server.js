const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error')

//Load env vars
dotenv.config({
  path: "./config/config.env"
});

//Connect DB
connectDb();

const app = express();

//Body Parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Route Files
const bootcamps = require("./routes/bootcamps");
//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.black.bgWhite.underline.bold)
);

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise)=>{
  console.log(`Error: ${err.message}`.red);
  //Close server and exit
  server.close(()=>{
    process.exit(1);
  });
})
