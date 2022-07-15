const userStores = require("./../routers/financial/store-mgr/user-stores");
//---

module.exports = function (app) {
  app.use("/api/financial/store-mgr/user-stores", userStores);
};
