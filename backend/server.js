const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors  = require("cors")
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/quizs", require("./routes/quizRoutes"))

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));