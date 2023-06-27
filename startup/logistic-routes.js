const supplierActivityTypes = require("./../routers/logistic/basic-info/supplier-activity-types");
const serviceGroups = require("./../routers/logistic/basic-info/service-groups");
const purchasingServices = require("./../routers/logistic/basic-info/purchasing-services");
const suppliers = require("./../routers/logistic/basic-info/suppliers");
const purchasingAdmins = require("./../routers/logistic/basic-info/purchasing-admins");
const purchasingAgents = require("./../routers/logistic/basic-info/purchasing-agents");
//---
const purchaseRequests = require("./../routers/logistic/purchase/purchase-requests");
const serviceRequests = require("./../routers/logistic/purchase/service-requests");
const inquiryRequests = require("./../routers/logistic/purchase/inquiry-requests");
const invoices = require("./../routers/logistic/purchase/invoices");
const purchaseCommands = require("./../routers/logistic/purchase/purchase-commands");
const purchaseOrders = require("./../routers/logistic/purchase/purchase-orders");
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
  app.use("/api/logistic/purchase/purchase-requests", purchaseRequests);
  app.use("/api/logistic/purchase/service-requests", serviceRequests);
  app.use("/api/logistic/purchase/inquiry-requests", inquiryRequests);
  app.use("/api/logistic/purchase/invoices", invoices);
  app.use("/api/logistic/purchase/purchase-commands", purchaseCommands);
  app.use("/api/logistic/purchase/purchase-orders", purchaseOrders);
  //---
};
