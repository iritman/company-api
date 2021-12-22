const express = require("express");
const auth = require("../routers/auth");
const filemanager = require("../routers/file-manager");
const modules = require("../routers/global/modules");
const accesses = require("../routers/global/accesses");
//------
const provinces = require("../routers/settings/basic-info/provinces");
const cities = require("../routers/settings/basic-info/cities");
//------
const roles = require("../routers/official/org/roles");
const departments = require("../routers/official/org/departments");
const companies = require("../routers/official/org/companies");
const members = require("../routers/official/org/members");
const employees = require("../routers/official/org/employees");
const companyAgents = require("../routers/official/org/company-agents");
const dutyLevels = require("../routers/official/org/duty-levels");
const duties = require("../routers/official/org/duties");
//------

module.exports = function (app) {
  app.use(express.json());

  //------
  app.use("/api/auth", auth);
  app.use("/api/filemanager", filemanager);
  app.use("/api/global/modules", modules);
  app.use("/api/global/accesses", accesses);
  //------
  app.use("/api/settings/basic-info/provinces", provinces);
  app.use("/api/settings/basic-info/cities", cities);
  //------
  app.use("/api/org/roles", roles);
  app.use("/api/org/departments", departments);
  app.use("/api/org/companies", companies);
  app.use("/api/org/members", members);
  app.use("/api/org/employees", employees);
  app.use("/api/org/company-agents", companyAgents);
  app.use("/api/org/duty-levels", dutyLevels);
  app.use("/api/org/duties", duties);
  //------
  let dir = "./uploaded-files/";
  app.use("/static/", express.static(dir));
};
