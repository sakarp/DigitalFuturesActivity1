//create object later replaced by db
let a1 = new Object();
let imgStack = {};
let stackArray = new Array();
let question = new Object();
let responseArray = new Array();
let sCo = new Object();
let qr = new Object();
let reasonsArray = new Array();
let reasonsList = new Array();
let sRO = new Object();
let sR1 = new Object();
let reasons = new Object();

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
imgStack.stackImg1 = "/images/thaiBuddha.png";
imgStack.stackImg1Small = "/images/thaiBuddhaSmall.png";
imgStack.stackImg2 = "/images/thaiBuddha.png";
imgStack.stackImg2Small = "/images/thaiBuddhaSmall.png";
imgStack.stackExplain =
  '<a href="https://kathmandupost.com/national/2019/07/08/in-embarrassing-gaffe-tourism-campaign-for-nepal-promotes-a-picture-from-thailand-in-london" target="_blank"> The Kathmandu Post </a> reports that Visit Nepal campaign used a photo of Thailand instead of Nepal for their promotion. This image was chosen from Shutterstock, a stock photo service, and was not properly verified by the designers nor the authorities.';

stackArray.push(imgStack);

imgStack = {};

imgStack.stackIntro =
  "This photo was doing the rounds of the internet have a gathering of world leaders. While many people laughed at it they did not believe it :-) ";
imgStack.stackImg1 = "/images/trumpHeadManipulated.png";
imgStack.stackImg1Small = "/images/trumpHeadManipulatedSmall.png";
imgStack.stackImg2 = "/images/trumpHeadReal.png";
imgStack.stackImg2Small = "/images/trumpHeadRealSmall.png";
imgStack.stackExplain =
  'Changing images is very simple and easy with digital tools. This ability can be used to create a funny joke like this or something scarier.';

stackArray.push(imgStack);

imgStack = {};

imgStack.stackIntro =
  "During the last Indian elections, it appeared that these famous Bollywood stars were campaigning for one of the major political parties. But people were suspicious.  ";
imgStack.stackImg1 = "/images/ranvirManipulated.png";
imgStack.stackImg1Small = "/images/ranvirManipulatedSmall.png";
imgStack.stackImg2 = "/images/ranvirReal.png";
imgStack.stackImg2Small = "/images/ranvirRealSmall.png";
imgStack.stackExplain =
  '<a href="https://scroll.in/article/919785/fact-check-did-bollywood-stars-ranveer-singh-and-deepika-padukone-really-campaign-for-the-bjp" target="_blank"> Scroll.in  </a> reports that this image was manipulated from a photo the Bollywood couple took after a visit to a temple.';

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

responseArray.push(qr);
qr = {};

qr.radioText = "to knowingly undermine society";
qr.radioValue = "undermine";
qr.radioName = "motive";
qr.link = "";

responseArray.push(qr);
qr = {};

qr.radioText = "result of poor/sloppy research";
qr.radioValue = "sloppy";
qr.radioName = "motive";
qr.link = "";

responseArray.push(qr);
qr = {};

qr.radioText = "political distraction";
qr.radioValue = "pdistract";
qr.radioName = "motive";
qr.link = "";

responseArray.push(qr);
qr = {};

qr.radioText = "geniune political differences";
qr.radioValue = "preal";
qr.radioName = "motive";
qr.link = "";

responseArray.push(qr);
qr = {};

qr.radioText = "parody/fun/meme";
qr.radioValue = "parody";
qr.radioName = "motive";
qr.link = "";

responseArray.push(qr);
qr = {};

question.responseStack = responseArray;
a1.Question2 = question;

reasons.reasonsIntro = "Why do people spread disinformation?";
reasons.reasonsText = "Experts and researches suggest there are six resons that people or organization spread disinformation. Click on the links below to learn more about each of the reasons.";

sRO.text = "to undermine society";
sRO.link = "www.karkhana.asia";

reasonsArray.push(sRO);

sRO = {};

sRO.text = "for financial gain";
sRO.link = "www.karkhana.asia";

reasonsArray.push(sRO);

sRO = {};

sRO.text = "result of sloppy or poor journalism";
sRO.link = "www.karkhana.asia";

reasonsArray.push(sRO);

sRO = {};

sRO.text = "to distract for political purpose";
sRO.link = "www.karkhana.asia";

reasonsArray.push(sRO);

sRO = {};

sRO.text = "because of actual ideological/political differences";
sRO.link = "www.karkhana.asia";

reasonsArray.push(sRO);

sRO = {};

sRO.text = "paradoy/fun/meme";
sRO.link = "www.karkhana.asia";

reasonsArray.push(sRO);


reasons.r1 = "no consequences"; 
reasons.r2 = "mild consequcnes";
reasons.r3 = "some consequences"; 
reasons.r4 = "important consequences"; 
reasons.r5 = "strong consequences"; 
reasons.r6 = "severe consequences";

reasons.reasonsStack = reasonsArray;
a1.Reasons = reasons; 
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
