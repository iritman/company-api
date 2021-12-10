const express = require("express");
const auth = require("../routers/auth");
const modules = require("../routers/global/modules");
const accesses = require("../routers/global/accesses");
//------
const provinces = require("../routers/org/provinces");

module.exports = function (app) {
  app.use(express.json());

  //------
  app.use("/api/auth", auth);
  app.use("/api/global/modules", modules);
  app.use("/api/global/accesses", accesses);
  //------
  app.use("/api/org/provinces", provinces);
  //------
  let dir = "./uploaded-files/";
  app.use("/static/", express.static(dir));
};
