const bodyParser = require("body-parser");
const express = require("express");
const { Server } = require("http");
const mongoose = require("mongoose");

var baseA1 = require("./mainA11.json");

mongoose.connect("mongodb://localhost:27017/myTest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
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

let app = express();
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Digital Futures Initiative");
});

app.get("/baseA1", (req, res) => {
  A1Model.create(baseA1, function (err, docs) {
    if (err) {
      console.log("DB Error ") + err;
      res.send("failed at inserting baseA1");
    } else {
      console.log("success");

      res.send("successfully inserted baseA1");
    }
  });
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

app.get("/chooseA1", (req, res) => {
  A1Model.find({}, function (err, docs) {
    if (err) {
      res.send("Error " + err);
    }
    let myA1 = JSON.parse(JSON.stringify(docs));

    //get unique values for filtering
    let languageSet = [...new Set(myA1.map((a1) => a1.Language))];
    let topLevelSet = [...new Set(myA1.map((a1) => a1.TopLevelGroup))];
    let activityGroupSet = [...new Set(myA1.map((a1) => a1.ActivityGrouping))];
    let activityNameSet = [...new Set(myA1.map((a1) => a1.ActivityName))];
    let ageSet = [...new Set(myA1.map((a1) => a1.AgeGroups).flat())];
    let countrySet = [
      ...new Set(myA1.map((a1) => a1.Countries.map((ac) => ac.Country)).flat()),
    ];
    let regionSet = [
      ...new Set(myA1.map((a1) => a1.Countries.map((ac) => ac.Region)).flat()),
    ];

    let uniqueValues = {
      languageSet: languageSet,
      topLevelSet: topLevelSet,
      activityGroupSet: activityGroupSet,
      activityNameSet: activityNameSet,
      ageSet: ageSet,
      countrySet: countrySet,
      regionSet: regionSet,
    };
    res.render("chooseA1.pug", { myA1, uniqueValues });
  });
});

app.post("/createNewUpdateA1", function (req, res) {
  let myA1 = req.body[0];
  //create a new entry with the same data
  A1Model.create(myA1, function (err, docs) {
    if (err) {
      res.json({ Message: "Create Error", Data: err });
    }
    res.json({ Message: "New ID", Data: docs._id });
  });
});

app.post("/altupdateA1", function (req, res) {
  let page = req.body.admin.page;
  let currentStack = req.body.admin.currentStack;
  let rStr = req.body.admin.rStr;
  let myA1 = req.body.data.jsonA1;
  var ObjectId = require("mongodb").ObjectId;
  myID = "5fc49034f34e2f1c50068e90";
  A1Model.findOneAndUpdate(
    { _id: new ObjectId(myID) },
    myA1,
    function (err, result) {
      if (err) {
        res.json({ Message: "error" });
      } else {
        res.json({ Message: "All Good" });
      }
    }
  );
});

app.get("/altUpdateA1", (req, res) => {
  var ObjectId = require("mongodb").ObjectId;
  let myA1 = JSON.parse("{}");
  let myID = req.query.dbid;
  A1Model.findOne({ _id: new ObjectId(myID) }, function (err, docs) {
    myA1 = JSON.parse(JSON.stringify(docs));

    let page = req.query.page;
    let currentStack = req.query.currentStack;
    let rStr = req.query.rStr;
    let totalPages = myA1.ImageStack.length * 5 + 2;
    myA1.dbid = myID;
    //if page is undefined. it means its the first call
    //so set currentPage and currentStack
    if (!page) {
      myA1.dbID = myID;
      myA1.currentPage = 1;
      myA1.currentStack = 0;
      myA1.renderString = "altUpdate.pug";
      myA1.rStr = 1;
      myA1.pageOfPage = "Page 1 of " + totalPages;
      res.render(myA1.renderString, { myA1 });
      return;
    }

    let a1 = myA1;
    totalPages = a1.ImageStack.length * 5 + 2;
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
        a1.renderString = "altUpdate.pug";
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
          a1.renderString = "altUpdateFinalA1.pug";
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
          mypageCount =
            parseInt(a1.currentPage) + parseInt(a1.currentStack * 5);
          a1.pageOfPage = "Page " + mypageCount + " of " + totalPages;
          if (currentStack < 0) {
            console.log("crazy error");
            //send 404 file missing message
          }
        }
        a1.currentPage = page;
        a1.currentStack = currentStack;
        a1.renderString = "altUpdate.pug";
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
        a1.renderString = "altUpdate.pug";
        a1.rStr = 1;
        //page count is all the image stacks, excluding the current plus current page
        mypageCount = parseInt(a1.currentPage) + parseInt(a1.currentStack * 5);
        a1.pageOfPage = "Page " + mypageCount + " of " + totalPages;
      } else {
        a1.currentPage = page;
        a1.currentStack = currentStack;
        a1.renderString = "altUpdateFinalA1.pug";
        a1.rStr = 2;
        //page count is all the image stacks plus current page
        mypageCount =
          parseInt(a1.currentPage) + parseInt(a1.ImageStack.length * 5);
        a1.pageOfPage = "Page " + mypageCount + " of " + totalPages;
      }
    }

    myA1 = a1;
    res.render(myA1.renderString, { myA1 });
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
