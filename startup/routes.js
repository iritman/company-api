const express = require("express");
const auth = require("../routers/auth");
const modules = require("../routers/global/modules");

module.exports = function (app) {
  app.use(express.json());

  //------
  app.use("/api/auth", auth);
  app.use("/api/global/modules", modules);
  //------
  let dir = "./uploaded-files/";
  app.use("/static/", express.static(dir));
};
