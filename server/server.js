const { json } = require('body-parser');
let express = require('express');
const { Server } = require('http');
let myServer = express();

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
a1.Countries.push({ "Country": "Nepal", "Region": "South Asia" });
a1.Countries.push({ "Country": "India", "Region": "South Asia" });

//set up image stack
imgStack.stackIntro = "This beautiful photo was used on the London Metro to promote the Visit Nepal 2020 campaign. But it ran into a lot of controversy.";
imgStack.stackImg1 = "images\\thaiBuddha.png";
imgStack.stackImg2 = "images\\thaiBuddha.png";

stackArray.push(imgStack);

imgStack.stackIntro - "test 2";
imgStack.stackImg1 = "images\\parodyModified.png";
imgStack.stackImg2 = "images\\parodyReal.png";

stackArray.push(imgStack);

a1.ImageStack = stackArray;

question.questionText = "Can you guess why?";
qr.radioText = "Photo is manipulated";
qr.radioValue = "manipulated";
qr.radioName = "theIssue";
qr.link = "";
qr.isCorrect = false;

responseArray.push(qr);

qr.radioText = "Photo is used without permission";
qr.radioValue = "permission";
qr.radioName = "theIssue";
qr.link = "";
qr.isCorrect = true;

responseArray.push(qr);

qr.radioText = "Photo is of the wrong place/event";
qr.radioValue = "wrong";
qr.radioName = "theIssue";
qr.link = "";
qr.isCorrect = false;

responseArray.push(qr);

qr.radioText = "The issue is something else";
qr.radioValue = "other";
qr.radioName = "theIssue";
qr.link = "";
qr.isCorrect = false;

responseArray.push(qr);
question.responseStack = responseArray;

a1.Question1 = question;

sCo.reflectQuestion1 = "What are the social consequences of this image?";
sCo.reflectQuestion2 = "How serious are the social conseqeuences?";
sCo.mild = "mild"
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

qr.radioText = "to knowingly undermine society";
qr.radioValue = "undermine";
qr.radioName = "motive";
qr.link = "";
qr.isCorrect = false;

responseArray.push(qr);

qr.radioText = "result of poor/sloppy research";
qr.radioValue = "sloppy";
qr.radioName = "motive";
qr.link = "";
qr.isCorrect = true;

responseArray.push(qr);

question.responseStack = responseArray;
a1.Question2 = question;

myServer.get('/', (request, response)=> {
    response.json(a1);
});

myServer.listen(3000, ()=>{
    console.log("server is listening at 3000");
});