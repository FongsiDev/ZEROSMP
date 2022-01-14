const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const referrerPolicy = require("referrer-policy");
const config = require("./config");
app.use(referrerPolicy({ policy: "strict-origin" }));
const templateDir = path.resolve(`${process.cwd()}${path.sep}`);
app.use("/assets", express.static(path.resolve(`${templateDir}${path.sep}assets`)));
app.use("/assets", express.static(path.resolve(`${templateDir}${path.sep}assets`)));
app.use("/media", express.static(path.resolve(`${templateDir}${path.sep}media`)));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
const render = (req, res, template, data = {}) => {
  const baseData = {
    path: req.path,
    config 
  };
  res.render(
    path.resolve(`${templateDir}${path.sep}${template}.ejs`),
    Object.assign(baseData, data)
  );
};

const listener = app.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});

app.get("/", async(req, res) => {
 render(req, res, "index");
});

app.get("/servers", async (req, res) => {
  render(req, res, "server")
});

   app.get("/grp", async)     