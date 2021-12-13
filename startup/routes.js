const express = require("express");
const auth = require("../routers/auth");
const modules = require("../routers/global/modules");
const accesses = require("../routers/global/accesses");
//------
const provinces = require("../routers/org/provinces");
const cities = require("../routers/org/cities");
const roles = require("../routers/org/roles");
const departments = require("../routers/org/departments");
const companies = require("../routers/org/companies");

module.exports = function (app) {
  app.use(express.json());

  //------
  app.use("/api/auth", auth);
  app.use("/api/global/modules", modules);
  app.use("/api/global/accesses", accesses);
  //------
  app.use("/api/org/provinces", provinces);
  app.use("/api/org/cities", cities);
  app.use("/api/org/roles", roles);
  app.use("/api/org/departments", departments);
  app.use("/api/org/companies", companies);
  //------
  let dir = "./uploaded-files/";
  app.use("/static/", express.static(dir));
};
