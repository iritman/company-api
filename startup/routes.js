const express = require("express");
const auth = require("../routers/auth");
const filemanager = require("../routers/file-manager");
const modules = require("../routers/global/modules");
const accesses = require("../routers/global/accesses");
const form_manager = require("../routers/global/form-manager");
//------
const settingsRoutes = require("./settings-routes");
const officialRoutes = require("./official-routes");
const financialRoutes = require("./financial-routes");
const logisticRoutes = require("./logistic-routes");
const dashboardRoutes = require("./dashboard-routes");
//------
const accountRoutes = require("./account-routes");
//------

module.exports = function (app) {
  app.use(express.json());

  //------
  app.use("/api/auth", auth);
  app.use("/api/filemanager", filemanager);
  app.use("/api/global/modules", modules);
  app.use("/api/global/accesses", accesses);
  app.use("/api/global/form", form_manager);
  //------
  settingsRoutes(app);
  officialRoutes(app);
  financialRoutes(app);
  logisticRoutes(app);
  dashboardRoutes(app);
  accountRoutes(app);
  //------
  let dir = "./uploaded-files/";
  app.use("/static/", express.static(dir));
};
