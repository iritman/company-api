const express = require("express");
const auth = require("../routers/auth");

module.exports = function (app) {
  app.use(express.json());

  //------
  app.use("/api/auth", auth);

  //------
  let dir = "./uploaded-files/";
  app.use("/static/", express.static(dir));
};
