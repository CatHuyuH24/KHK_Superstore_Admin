const express = require('express');
const path =require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const utils=require('./apps/Utils/jwtUtils');

require("dotenv").config();


const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));


const indexRouter = require("./apps/home/indexRouter");
const televisionRouter = require("./apps/television/televisionRouter");
const mobilephoneRouter = require("./apps/mobilephone/mobilephoneRouter");
const computerRouter = require("./apps/computer/computerRouter");
const searchRouter = require("./apps/search/searchRouter");
const registrationRouter = require("./apps/registration/registrationRouter");
const categoryRouter = require("./apps/category/categoryRouter");
const loginRouter=require('./apps/login/loginRouter');
const logoutRouter=require('./apps/logout/logoutRouter')

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", "views");


// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({ extended: true }));
app.use("/dist", express.static("dist"));


app.use("/", indexRouter);
app.use("/televisions", televisionRouter);
app.use("/mobilephones", mobilephoneRouter);
app.use("/computers", computerRouter);
app.use("/register", registrationRouter);
app.use("/search", searchRouter);
app.use("/", categoryRouter);
app.use("/login",loginRouter);
app.use("/logout",logoutRouter)

app.get("/cart",utils.authMiddleware({session:false}),(req,res)=>{
  res.render('cart',{
    title: 'Your Cart',
    body: '<p></p>' 

  });
})

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});



