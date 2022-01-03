const userDuties = require("./../routers/official/org/user-duties");

module.exports = function (app) {
  app.use("/api/official/org/user-duties", userDuties);
};
