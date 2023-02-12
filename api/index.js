const express = require("express");
const cors = require("cors");
const Parse = require("parse/node");
require("dotenv").config();

const app = express();
app.use(cors());

const app_id = process.env.REACT_APP_APP_ID;
const js_id = process.env.REACT_APP_JS_ID;
const serviceID = process.env.REACT_APP_SERVICE_ID;
const templateID = process.env.REACT_APP_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_PUBLIC_KEY;

Parse.initialize(app_id, js_id);
Parse.serverURL = "https://parseapi.back4app.com/";

async function getData() {
  const Project = Parse.Object.extend("Project");
  const query = new Parse.Query(Project);
  try {
    const results = await query.find();
    const data = [];
    for (const object of results) {
      const projectName = object.get("projectName");
      const projectLink = object.get("projectLink");
      const projectPhoto = object.get("projectPhoto");
      const projectLiveSite = object.get("projectLiveSite");
      const projectTech = object.get("projectTech");
      const techArray = projectTech.split(",");

      data.unshift({
        projectName: projectName,
        projectLink: projectLink,
        projectPhoto: projectPhoto,
        projectLiveSite: projectLiveSite,
        projectTechArray: techArray,
      });
    }
    app.get("/api", function (req, res) {
      res.send(data);
    });
  } catch (error) {
    console.error("Error while fetching Project", error);
  }
}

getData();

app.get("/keys", (req, res) => {
  const keys = {
    serviceID: serviceID,
    templateID: templateID,
    publicKey: publicKey,
  };

  res.send(keys);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);

module.exports = app;
