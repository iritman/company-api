const userDuties = require("./../routers/official/org/user-duties");
const userMembersDuties = require("./../routers/official/org/user-members-duties");

module.exports = function (app) {
  app.use("/api/official/org/user-duties", userDuties);
  app.use("/api/official/org/user-members-duties", userMembersDuties);
};
