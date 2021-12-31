const express = require("express");
const auth = require("../routers/auth");
const filemanager = require("../routers/file-manager");
const modules = require("../routers/global/modules");
const accesses = require("../routers/global/accesses");
//------
const provinces = require("../routers/settings/basic-info/provinces");
const cities = require("../routers/settings/basic-info/cities");
//------
const pageAccesses = require("../routers/settings/accesses/page-accesses");
//------
const roles = require("../routers/settings/org/roles");
const departments = require("../routers/settings/org/departments");
const companies = require("../routers/settings/org/companies");
const members = require("../routers/settings/org/members");
const employees = require("../routers/settings/org/employees");
const companyAgents = require("../routers/settings/org/company-agents");
const dutyLevels = require("../routers/settings/org/duty-levels");
const duties = require("../routers/settings/org/duties");
//------
const securityGuards = require("../routers/settings/timex/security-guards");
const vacationTypes = require("../routers/settings/timex/vacation-types");
const missionTypes = require("../routers/settings/timex/mission-types");
const holidays = require("../routers/settings/timex/holidays");
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
  app.use("/api/settings/accesses/page-accesses", pageAccesses);
  //------
  app.use("/api/settings/timex/security-guards", securityGuards);
  app.use("/api/settings/timex/vacation-types", vacationTypes);
  app.use("/api/settings/timex/mission-types", missionTypes);
  app.use("/api/settings/timex/holidays", holidays);
  //------
  app.use("/api/settings/org/roles", roles);
  app.use("/api/settings/org/departments", departments);
  app.use("/api/settings/org/companies", companies);
  app.use("/api/settings/org/members", members);
  app.use("/api/settings/org/employees", employees);
  app.use("/api/settings/org/company-agents", companyAgents);
  app.use("/api/settings/org/duty-levels", dutyLevels);
  app.use("/api/settings/org/duties", duties);
  //------
  let dir = "./uploaded-files/";
  app.use("/static/", express.static(dir));
};
