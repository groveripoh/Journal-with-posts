const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is a simple journal using node.js express and ejs. But it doesn't have a database...";
const aboutContent = "My name is Grover Ipoh. I built this journal website during the 2020 Web Development Bootcamp in London. Thanks to my teacher, Angela Yu.";
const contactContent = "Not available !";

const app = express();
let posties = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//to display the home page (home.ejs)
app.get("/", function(req, res) {
  res.render("home", {
    homeText: homeStartingContent,


    posties: posties
  });
});

//to creat a new dynamic web page for each article
app.get("/posts/:topic", function(req, res) {
  //change to lowerCase using lodash
  const reqtopic = _.lowerCase(req.params.topic);
  posties.forEach(function(journal) {
    const storedtitle = _.lowerCase(journal.title);
  //to check the title matches an article in the array posties
    if (storedtitle === reqtopic) {
      //to create a new web page for the article. we need a page called post.ejs
      res.render("post", {
        title: journal.title,
        body: journal.content
      });
    }
  });
});


//to display the about page
app.get("/about", function(req, res) {
  res.render("about", {aboutText: aboutContent});
});


app.get("/contact", function(req, res) {
  res.render("contact", {contactText: contactContent});
});


app.get("/compose", function(req, res) {
  res.render('compose');
});
//to save the journal entry to the array called posties
app.post("/compose", function(req, res) {
  var journal = {
    title: req.body.postTitle,
    content: req.body.journalBody
  };
  posties.push(journal);
  res.redirect("/");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server started on port 3000"));
