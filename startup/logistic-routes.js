const supplierActivityTypes = require("./../routers/logistic/basic-info/supplier-activity-types");
const serviceGroups = require("./../routers/logistic/basic-info/service-groups");
const purchasingServices = require("./../routers/logistic/basic-info/purchasing-services");
const suppliers = require("./../routers/logistic/basic-info/suppliers");
const purchasingAdmins = require("./../routers/logistic/basic-info/purchasing-admins");
const purchasingAgents = require("./../routers/logistic/basic-info/purchasing-agents");
//---

module.exports = function (app) {
  app.use(
    "/api/logistic/basic-info/supplier-activity-types",
    supplierActivityTypes
  );
  app.use("/api/logistic/basic-info/service-groups", serviceGroups);
  app.use("/api/logistic/basic-info/purchasing-services", purchasingServices);
  app.use("/api/logistic/basic-info/suppliers", suppliers);
  app.use("/api/logistic/basic-info/purchasing-admins", purchasingAdmins);
  app.use("/api/logistic/basic-info/purchasing-agents", purchasingAgents);
  //---
};
