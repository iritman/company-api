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
const userGroupFeatures = require("./../routers/financial/store-mgr/user-group-features");
const userInventoryControlAgents = require("./../routers/financial/store-mgr/user-inventory-control-agents");
const userProducts = require("./../routers/financial/store-mgr/user-products");
const userBachPatterns = require("./../routers/financial/store-mgr/user-bach-patterns");
const userBaches = require("./../routers/financial/store-mgr/user-baches");
const userStorageCenters = require("./../routers/financial/store-mgr/user-storage-centers");
//---
const tafsilTypes = require("./../routers/financial/accounts/tafsil-types");
const tafsilAccounts = require("./../routers/financial/accounts/tafsil-accounts");
const structureGroups = require("./../routers/financial/accounts/structure-groups");
const structureTotals = require("./../routers/financial/accounts/structure-totals");
const structureMoeins = require("./../routers/financial/accounts/structure-moeins");
//---
const financialPeriods = require("./../routers/financial/ledger/financial-periods");
const docTypes = require("./../routers/financial/ledger/doc-types");
const ledgers = require("./../routers/financial/ledger/ledgers");
//---
const vouchers = require("./../routers/financial/financial-docs/vouchers");
//---
const bankTypes = require("./../routers/financial/treasury/basic-info/bank-types");
const banks = require("./../routers/financial/treasury/basic-info/banks");
const bankAccountTypes = require("./../routers/financial/treasury/basic-info/bank-account-types");
const bankBranches = require("./../routers/financial/treasury/basic-info/bank-branches");
const regards = require("./../routers/financial/treasury/basic-info/regards");
const personCompanyBankAccounts = require("./../routers/financial/treasury/basic-info/person-company-bank-accounts");
const companyBankAccounts = require("./../routers/financial/treasury/basic-info/company-bank-accounts");
const cashBoxes = require("./../routers/financial/treasury/basic-info/cash-boxes");
const chequeBooks = require("./../routers/financial/treasury/basic-info/cheque-books");
const cashFlows = require("./../routers/financial/treasury/basic-info/cash-flows");
const financialOperations = require("../routers/financial/treasury/basic-info/financial-operations");
const standardDescriptions = require("../routers/financial/treasury/basic-info/standard-descriptions");
//---
const paymentRequests = require("../routers/financial/treasury/pay/payment-requests");
const paymentOrders = require("../routers/financial/treasury/pay/payment-orders");
//---
const receiveRequests = require("../routers/financial/treasury/receive/receive-requests");
const receiveReceipts = require("../routers/financial/treasury/receive/receive-receipts");
const bankHandOvers = require("../routers/financial/treasury/receive/bank-hand-overs");
const collectionRejections = require("../routers/financial/treasury/receive/collection-rejections");
//---
const collectorAgents = require("../routers/financial/treasury/collector-agent/collector-agents");
//---
const funds = require("../routers/financial/treasury/fund/funds");
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
  app.use("/api/financial/store-mgr/user-group-features", userGroupFeatures);
  app.use(
    "/api/financial/store-mgr/user-inventory-control-agents",
    userInventoryControlAgents
  );
  app.use("/api/financial/store-mgr/user-products", userProducts);
  app.use("/api/financial/store-mgr/user-bach-patterns", userBachPatterns);
  app.use("/api/financial/store-mgr/user-baches", userBaches);
  app.use("/api/financial/store-mgr/user-storage-centers", userStorageCenters);
  //---
  app.use("/api/financial/accounts/tafsil-types", tafsilTypes);
  app.use("/api/financial/accounts/tafsil-accounts", tafsilAccounts);
  app.use("/api/financial/accounts/structure-groups", structureGroups);
  app.use("/api/financial/accounts/structure-totals", structureTotals);
  app.use("/api/financial/accounts/structure-moeins", structureMoeins);
  //---
  app.use("/api/financial/ledger/financial-periods", financialPeriods);
  app.use("/api/financial/ledger/doc-types", docTypes);
  app.use("/api/financial/ledger/ledgers", ledgers);
  //---
  app.use("/api/financial/docs/vouchers", vouchers);
  //---
  app.use("/api/financial/treasury/basic/bank-types", bankTypes);
  app.use("/api/financial/treasury/basic/banks", banks);
  app.use("/api/financial/treasury/basic/bank-account-types", bankAccountTypes);
  app.use("/api/financial/treasury/basic/bank-branches", bankBranches);
  app.use("/api/financial/treasury/basic/regards", regards);
  app.use(
    "/api/financial/treasury/basic/pc-bank-accounts",
    personCompanyBankAccounts
  );
  app.use(
    "/api/financial/treasury/basic/company-bank-accounts",
    companyBankAccounts
  );
  app.use("/api/financial/treasury/basic/cash-boxes", cashBoxes);
  app.use("/api/financial/treasury/basic/cheque-books", chequeBooks);
  app.use("/api/financial/treasury/basic/cash-flows", cashFlows);
  app.use(
    "/api/financial/treasury/basic/financial-operations",
    financialOperations
  );
  app.use(
    "/api/financial/treasury/basic/standard-descriptions",
    standardDescriptions
  );
  //---
  app.use("/api/financial/treasury/pay/payment-requests", paymentRequests);
  app.use("/api/financial/treasury/pay/payment-orders", paymentOrders);
  //---
  app.use("/api/financial/treasury/receive/receive-requests", receiveRequests);
  app.use("/api/financial/treasury/receive/receive-receipts", receiveReceipts);
  app.use("/api/financial/treasury/receive/bank-hand-overs", bankHandOvers);
  app.use(
    "/api/financial/treasury/receive/collection-rejections",
    collectionRejections
  );
  //---
  app.use(
    "/api/financial/treasury/collector-agent/collector-agents",
    collectorAgents
  );
  //---
  app.use("/api/financial/treasury/fund/funds", funds);
  //---
};
