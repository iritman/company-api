const userAccount = require("../routers/user-account/user-account");
//---

module.exports = function (app) {
  app.use("/api/account", userAccount);
};
