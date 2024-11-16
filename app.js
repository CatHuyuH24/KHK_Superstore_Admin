// app.js
const express = require("express");
const path = require("path");
const app = express();
const indexRoutes = require("./routes/index");
const mobilephoneRoutes = require("./routes/mobilephoneRouter");
const computerRoutes = require("./routes/computerRouter");
const televisionRoutes = require("./routes/televisionRouter");
const searchRoutes = require("./routes/searchRouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

app.use("/", indexRoutes);
app.use("/mobilephones", mobilephoneRoutes);
app.use("/computers", computerRoutes);
app.use("/televisions", televisionRoutes);
app.use("/search", searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
