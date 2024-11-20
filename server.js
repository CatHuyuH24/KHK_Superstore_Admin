const express = require("express");

require("dotenv").config();

const indexRouter = require("./apps/home/indexRouter");
const televisionRouter = require("./apps/television/televisionRouter");
const mobilephoneRouter = require("./apps/mobilephone/mobilephoneRouter");
const computerRouter = require("./apps/computer/computerRouter");
const searchRouter = require("./apps/search/searchRouter");
const registrationRouter = require("./apps/registration/registrationRouter");
const categoryRouter = require("./apps/category/categoryRouter");

const app = express();
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/dist", express.static("dist"));

app.use("/televisions", televisionRouter);
app.use("/mobilephones", mobilephoneRouter);
app.use("/computers", computerRouter);
app.use("/register", registrationRouter);
app.use("/search", searchRouter);
app.use("/", categoryRouter);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
