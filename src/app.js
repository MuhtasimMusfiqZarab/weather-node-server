const path = require("path");
const express = require("express");
const hbs = require("hbs");

console.log(__dirname); // directory of app.js
console.log(path.join(__dirname)); // directory of app.js
console.log(path.join(__dirname, "../public"));
console.log(__filename);

const app = express();
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setting the handlebars engine and views location
// to let express know which template engine we are working on // here express is the viewing engine
app.set("view engine", "hbs");
app.set("views", viewPath); //changing template directory from views to templates
hbs.registerPartials(partialPath);

// customizing the server to set root directory// static takes the path to serve up a static file
app.use(express.static(path.join(__dirname, "../public")));

// for serving this file we need route // here render searches the views directory
// 1st argument of render is the file //2nd is the value accesible by templtate (not mandetory)
app.get("/", (req, res) => {
  res.render("index", {
    // res.render should be used with a templete engine
    title: "Weather",
    author: "Muhtasim Musfiq Zarab"
  });
});

// not usig dynamic value
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    author: "Muhtasim Musfiq Zarab"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "You can find help by calling this number",
    contact: "+8801685055749",
    author: "Muhtasim Musfiq Zarab"
  });
});

//  this are used for manually serving data
app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is raining",
    location: "Dhaka"
  });
});

app.get("/help/*", (req, res) => {
  res.render("routeError", {
    error: " Help article Not Found",
    title: "Help Page",
    author: "Muhtasim Musfiq Zarab"
  });
});

//  * is wildcard character for matching everythinhg else
app.get("*", (req, res) => {
  res.render("routeError", {
    error: "404 page not found",
    title: "About Page",
    author: "Muhtasim Musfiq Zarab"
  });
});

//start server
app.listen(3000, () => {
  console.log("server is up on port 3000");
});

//----------------------------------------------//
