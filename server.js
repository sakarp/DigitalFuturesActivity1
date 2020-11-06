//create object later replaced by db
let a1 = new Object();
let imgStack = {};
let stackArray = new Array();
let question = new Object();
let responseArray = new Array();
let sCo = new Object();
let qr = new Object();

a1.TopLevelGroup = "Digital Citizenship";
a1.SubGrouping = "DRUMS Literacy";
a1.ActivityGrouping = "Is Seeing Believing?";
a1.ActivityName = "Consequences and Motivations for Image Manipulation";

a1.AgeGroups = [];
a1.AgeGroups.push("15-18");
a1.AgeGroups.push("19-24");
a1.AgeGroups.push("24+");

a1.Countries = [];
a1.Countries.push({ Country: "Nepal", Region: "South Asia" });
a1.Countries.push({ Country: "India", Region: "South Asia" });

//set up image stack
imgStack.stackIntro =
  "This beautiful photo was used on the London Metro to promote the Visit Nepal 2020 campaign. But it ran into a lot of controversy.";
imgStack.stackImg1 = "images/thaiBuddha.png";
imgStack.stackImg2 = "images/thaiBuddha.png";
imgStack.stackExplain =
  '<a href="https://kathmandupost.com/national/2019/07/08/in-embarrassing-gaffe-tourism-campaign-for-nepal-promotes-a-picture-from-thailand-in-london" target="_blank"> The Kathmandu Post </a> reports that Visit Nepal campaign used a photo of Thailand instead of Nepal for their promotion. This image was chosen from Shutterstock, a stock photo service, and was not properly verified by the designers nor the authorities.';

stackArray.push(imgStack);

imgStack = {};

imgStack.stackIntro = "This is the test for stack 2.";
imgStack.stackImg1 = "images/parodyModified.png";
imgStack.stackImg2 = "images/parodyReal.png";
stackArray.push(imgStack);

a1.ImageStack = stackArray;

question.questionText = "Can you guess why?";
qr.radioText = "Photo is manipulated";
qr.radioValue = "manipulated";
qr.radioName = "theIssue";
qr.link = "";
qr.isCorrect = false;

responseArray.push(qr);
qr = {};

qr.radioText = "Photo is used without permission";
qr.radioValue = "permission";
qr.radioName = "theIssue";
qr.link = "";
qr.isCorrect = true;

responseArray.push(qr);
qr = {};

qr.radioText = "Photo is of the wrong place/event";
qr.radioValue = "wrong";
qr.radioName = "theIssue";
qr.link = "";
qr.isCorrect = false;

responseArray.push(qr);
qr = {};

qr.radioText = "The issue is something else";
qr.radioValue = "other";
qr.radioName = "theIssue";
qr.link = "";
qr.isCorrect = false;

responseArray.push(qr);
question.responseStack = responseArray;

a1.Question1 = question;

sCo.reflectHeader = "REFLECT";
sCo.reflectQuestion1 = "What are the social consequences of this image?";
sCo.reflectQuestion2 = "How serious are the social conseqeuences?";
sCo.mild = "mild";
sCo.severe = "severe";

a1.SocialConsequences = sCo;

question = {}; //reset question
qr = {};
responseArray = [];

question.questionText = "What was the motivation for this disinformation?";
qr.radioText = "for financial gain";
qr.radioValue = "financial";
qr.radioName = "motive";
qr.link = "";
qr.isCorrect = false;

responseArray.push(qr);
qr = {};

qr.radioText = "to knowingly undermine society";
qr.radioValue = "undermine";
qr.radioName = "motive";
qr.link = "";
qr.isCorrect = false;

responseArray.push(qr);
qr = {};

qr.radioText = "result of poor/sloppy research";
qr.radioValue = "sloppy";
qr.radioName = "motive";
qr.link = "";
qr.isCorrect = true;

responseArray.push(qr);
qr = {};

question.responseStack = responseArray;
a1.Question2 = question;

//-------------------------

const { json } = require("body-parser");
const express = require("express");
const { Server } = require("http");
//const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/myTest');
//const db = mongoose.connection;

//db.on('error', (err)=>{
//    console.log(err);
//});

//db.once('open', ()=>{
//    console.log("DB Connection Successful");
//});

let app = express();
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});

app.get("/", (req, res) => {
  //console.log(req);
  res.send("Welcome to the Digital Futures Initiative");
});

app.get("/activity1", (req, res) => {
  let page = req.query.page;
  let currentStack = req.query.currentStack;
  let rStr = req.query.rStr;

  //if page is undefined. it means its the first call
  //so set currentPage and currentStack
  if (!page) {
    a1.currentPage = 1;
    a1.currentStack = 0;
    a1.renderString = "imgstack.pug";
    a1.rStr = 1;
    res.render(a1.renderString, { a1 });
    return;
  }

  //check if we are working with the imgstack files
  if (rStr == 1) {
    if (page == 6) {
      //check if its gone to page 6, which means its time to switch image stack
      //then increase the image stack we are working with
      //also reset page count to 1
      currentStack++;
      page = 1;
      a1.currentPage = page;
      a1.currentStack = currentStack;
      a1.renderString = "imgstack.pug";
      a1.rStr = rStr;

      //if we are at the end of all image stacks
      //change the page we use to show stuff
      if (
        currentStack == a1.ImageStack.length ||
        currentStack > a1.ImageStack.length
      ) {
        a1.renderString = "finalA1.pug";
        a1.rStr = 2;
        a1.currentStack = currentStack - 1;
        a1.currentPage = 1;
      }
    } else {
      //if we have not gotten to six
      //check if we are at 0
      if (page == 0) {
        //reduce current stack
        currentStack--;
        page = 5;
        if (currentStack < 0) {
          console.log("crazy error");
          //send 404 file missing message
        }
      }
      a1.currentPage = page;
      a1.currentStack = currentStack;
      a1.renderString = "imgstack.pug";
      a1.rStr = rStr;
    }
  }

  //check if we are working with the finala1.pug template
  if (rStr == 2) {
    // check if page is 0. this means user is trying to come back to stack
    if (page == 0) {
      console.log("in page 0");
      rStr = 1; //switch the file back
      page = 5; //switch the page to the last
      currentStack = a1.ImageStack.length - 1; //set stack to image on stack
      a1.currentPage = page;
      a1.currentStack = currentStack;
      a1.renderString = "imgstack.pug";
      a1.rStr = 1;
    } else {
      a1.currentPage = page;
      a1.currentStack = currentStack;
      a1.renderString = "finalA1.pug";
      a1.rStr = 2;
    }
  }

  res.render(a1.renderString, { a1 });
});

//must be the last item
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
});
