// app.js
const express = require("express");
const path = require("path");
const app = express();
const indexRoutes = require("./routes/index");
const mobilephoneRoutes = require("./routes/mobilephoneRouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

app.use("/", indexRoutes);
app.use("/mobilephones", mobilephoneRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
