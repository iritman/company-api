const userStores = require("./../routers/financial/store-mgr/user-stores");
const userProductNatures = require("./../routers/financial/store-mgr/user-product-natures");
const userMesureTypes = require("./../routers/financial/store-mgr/user-measure-types");
const userMesureUnits = require("./../routers/financial/store-mgr/user-measure-units");
const userPricingTypes = require("./../routers/financial/store-mgr/user-pricing-types");
const userProductCategories = require("./../routers/financial/store-mgr/user-product-categories");
const userFeatures = require("./../routers/financial/store-mgr/user-features");
const userInventoryControlAgents = require("./../routers/financial/store-mgr/user-inventory-control-agents");
const userProducts = require("./../routers/financial/store-mgr/user-products");
const userBachPatterns = require("./../routers/financial/store-mgr/user-bach-patterns");
//---

module.exports = function (app) {
  app.use("/api/financial/store-mgr/user-stores", userStores);
  app.use("/api/financial/store-mgr/user-product-natures", userProductNatures);
  app.use("/api/financial/store-mgr/user-measure-types", userMesureTypes);
  app.use("/api/financial/store-mgr/user-measure-units", userMesureUnits);
  app.use("/api/financial/store-mgr/user-pricing-types", userPricingTypes);
  app.use(
    "/api/financial/store-mgr/user-product-categories",
    userProductCategories
  );
  app.use("/api/financial/store-mgr/user-features", userFeatures);
  app.use(
    "/api/financial/store-mgr/user-inventory-control-agents",
    userInventoryControlAgents
  );
  app.use("/api/financial/store-mgr/user-products", userProducts);
  app.use("/api/financial/store-mgr/user-bach-patterns", userBachPatterns);
};
