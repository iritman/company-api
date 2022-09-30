const projects = require("./../routers/financial/public-settings/projects");
const costCencerTypes = require("./../routers/financial/public-settings/cost-center-types");
const costCenters = require("./../routers/financial/public-settings/cost-centers");
const currencies = require("./../routers/financial/public-settings/currencies");
const currencyRatios = require("./../routers/financial/public-settings/currency-ratios");
const creditSourceTypes = require("./../routers/financial/public-settings/credit-source-types");
const creditSources = require("./../routers/financial/public-settings/credit-sources");
//---
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
const userBaches = require("./../routers/financial/store-mgr/user-baches");
//---
const tafsilTypes = require("./../routers/financial/accounts/tafsil-types");
const tafsilAccounts = require("./../routers/financial/accounts/tafsil-accounts");
const structureGroups = require("./../routers/financial/accounts/structure-groups");
const structureTotals = require("./../routers/financial/accounts/structure-totals");
//---

module.exports = function (app) {
  app.use("/api/financial/public-settings/projects", projects);
  app.use("/api/financial/public-settings/cost-center-types", costCencerTypes);
  app.use("/api/financial/public-settings/cost-centers", costCenters);
  app.use("/api/financial/public-settings/currencies", currencies);
  app.use("/api/financial/public-settings/currency-ratios", currencyRatios);
  app.use(
    "/api/financial/public-settings/credit-source-types",
    creditSourceTypes
  );
  app.use("/api/financial/public-settings/credit-sources", creditSources);
  //---
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
  app.use("/api/financial/store-mgr/user-baches", userBaches);
  //---
  app.use("/api/financial/accounts/tafsil-types", tafsilTypes);
  app.use("/api/financial/accounts/tafsil-accounts", tafsilAccounts);
  app.use("/api/financial/accounts/structure-groups", structureGroups);
  app.use("/api/financial/accounts/structure-totals", structureTotals);
  //---
};
