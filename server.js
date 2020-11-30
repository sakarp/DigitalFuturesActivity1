const { json } = require("body-parser");
const express = require("express");
const { Server } = require("http");
const mongoose = require("mongoose");

var a1 = require("./mainA11.json");

mongoose.connect("mongodb://localhost:27017/myTest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("DB Connection Successful");
});

const a1Schema = new mongoose.Schema({
  TopLevelGroup: {
    type: "String",
  },
  SubGrouping: {
    type: "String",
  },
  ActivityGrouping: {
    type: "String",
  },
  ActivityName: {
    type: "String",
  },
  AgeGroups: {
    type: ["String"],
  },
  Countries: {
    type: ["Mixed"],
  },
  Language: {
    type: "String",
  },
  ImageStack: {
    type: ["Mixed"],
  },
  Question1: {
    questionText: {
      type: "String",
    },
    responseStack: {
      type: ["Mixed"],
    },
  },
  SocialConsequences: {
    reflectHeader: {
      type: "String",
    },
    reflectQuestion1: {
      type: "String",
    },
    reflectQuestion2: {
      type: "String",
    },
    mild: {
      type: "String",
    },
    severe: {
      type: "String",
    },
    c1Text: {
      type: "String",
    },
    c2Text: {
      type: "String",
    },
    c3Text: {
      type: "String",
    },
    c4Text: {
      type: "String",
    },
    c5Text: {
      type: "String",
    },
    c6Text: {
      type: "String",
    },
    cLeadText: {
      type: "String",
    },
  },
  Question2: {
    questionText: {
      type: "String",
    },
    responseStack: {
      type: ["Mixed"],
    },
  },
  Reasons: {
    reasonsIntro: {
      type: "String",
    },
    reasonsText: {
      type: "String",
    },
    reasonsStack: {
      type: ["Mixed"],
    },
  },
});

const A1Model = mongoose.model("A1Model", a1Schema);

/*db.create(a1, function(error, result){
  if(error){
    console.log(error);
  }
  else{
    console.log(result);
  }
});*/

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

app.get("/test", (req, res) => {
  /*const seeA1 = new A1Model(a1);
  seeA1.save(function (err) {
    if (err) {
      console.log(err);
      return; 
    }
    });*/
  console.log("saved");
  res.send("saved data");
});

app.get("/updateA1", (req, res) => {
  var ObjectId = require("mongodb").ObjectId;
  let myA1;
  myID = "5fc49034f34e2f1c50068e90";
  A1Model.findOne({ _id: new ObjectId(myID) }, function (err, docs) {
    myA1 = JSON.parse(JSON.stringify(docs));
    res.render("a1update.pug", { myA1 });
    return;
  });
});

app.get("/activity1", (req, res) => {
  let page = req.query.page;
  let currentStack = req.query.currentStack;
  let rStr = req.query.rStr;
  let totalPages = a1.ImageStack.length * 5 + 2;

  //if page is undefined. it means its the first call
  //so set currentPage and currentStack
  if (!page) {
    a1.currentPage = 1;
    a1.currentStack = 0;
    a1.renderString = "imgstack.pug";
    a1.rStr = 1;
    a1.pageOfPage = "Page 1 of " + totalPages;
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
      //my page count is the current page + 5 pages for each of the previous image stacks
      let mypageCount =
        parseInt(a1.currentPage) + parseInt(a1.currentStack * 5);
      a1.pageOfPage = "Page " + mypageCount + " of " + totalPages;

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
        //page count is all the image stacks plus current page
        mypageCount =
          parseInt(a1.currentPage) + parseInt(a1.ImageStack.length * 5);
        a1.pageOfPage = "Page " + mypageCount + " of " + totalPages;
      }
    } else {
      //if we have not gotten to six
      //check if we are at 0
      if (page == 0) {
        //reduce current stack
        currentStack--;
        page = 5;
        mypageCount = parseInt(a1.currentPage) + parseInt(a1.currentStack * 5);
        a1.pageOfPage = "Page " + mypageCount + " of " + totalPages;
        if (currentStack < 0) {
          console.log("crazy error");
          //send 404 file missing message
        }
      }
      a1.currentPage = page;
      a1.currentStack = currentStack;
      a1.renderString = "imgstack.pug";
      a1.rStr = rStr;
      //page count is all the image stacks plus current page
      mypageCount = parseInt(a1.currentPage) + parseInt(a1.currentStack * 5);
      a1.pageOfPage = "Page " + mypageCount + " of " + totalPages;
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
      //page count is all the image stacks, excluding the current plus current page
      mypageCount = parseInt(a1.currentPage) + parseInt(a1.currentStack * 5);
      a1.pageOfPage = "Page " + mypageCount + " of " + totalPages;
    } else {
      a1.currentPage = page;
      a1.currentStack = currentStack;
      a1.renderString = "finalA1.pug";
      a1.rStr = 2;
      //page count is all the image stacks plus current page
      mypageCount =
        parseInt(a1.currentPage) + parseInt(a1.ImageStack.length * 5);
      a1.pageOfPage = "Page " + mypageCount + " of " + totalPages;
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
