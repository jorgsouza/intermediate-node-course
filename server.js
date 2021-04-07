const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

const User = require("./models/User");
const { response } = require("express");

mongoose.connect("mongodb://localhost/userData", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

// SEND RESPONSE
function sendResponse(res, err, data) {
  if (err) {
    res.json({
      success: false,
      messa: err,
    });
  } else if (!data) {
    res.json({
      success: false,
      message: "Not found",
    });
  } else {
    res.json({
      success: true,
      data: data,
    });
  }
}

// CREATE
app.post("/users", (req, res) => {
  User.create(
    // ERA da forma comentada
    // {
    //   name: req.body.newData.name,
    //   email: req.body.newData.email,
    //   password: req.body.newData.password,
    // },
    { ...req.body.newData },
    (err, data) => {
      sendResponse(res, err, data);
    }
  );
});

// READ
app
  .route("/users/:id")
  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  })
  // UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      { ...req.body.newData },
      { new: true },
      (err, data) => {
        sendResponse(res, err, data);
      }
    );
  })
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  });
