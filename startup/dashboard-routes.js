const userDashboard = require("../routers/dashboard/user-dashboard");
//---

module.exports = function (app) {
  app.use("/api/dashboard/user", userDashboard);
};
