const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.GetProductRequestParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/item/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.GetProductRequestItemParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  result.Products.forEach((product) => {
    if (product.MeasureUnits) {
      product.MeasureUnits = JSON.parse(product.MeasureUnits);
    }
  });

  res.send(result);
});

router.get("/items/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.GetProductRequestItemsByRequestID ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result = JSON.parse(result.Items);

  res.send(result);
});

router.get("/is-returnable/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `SELECT Financial_StoreOprAPI.IsReturnableProductRequest(${req.params.requestID}) AS IsReturnable`
  );

  result = result.recordset[0];

  res.send(result);
});

router.post("/search/members", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC OrgAPI.SearchMembersAsParams ${MemberID}, N'ProductRequests', N'${req.body.searchText}'`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/search/member/:memberID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.SearchMemberByID ${MemberID}, ${req.params.memberID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/search/products", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreAPI.SearchProductsAsParams ${MemberID}, N'ProductRequests', N'${req.body.searchText}'`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  result.forEach((p) => {
    p.Features = JSON.parse(p.Features);
    p.InventoryControlAgents = JSON.parse(p.InventoryControlAgents);
    p.MeasureConverts = JSON.parse(p.MeasureConverts);
    p.MeasureUnits = JSON.parse(p.MeasureUnits);
    p.Stores = JSON.parse(p.Stores);
  });

  res.send(result);
});

router.get("/search/product/:productID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreAPI.SearchProductByID ${MemberID}, ${req.params.productID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Features = JSON.parse(result.Features);
  result.InventoryControlAgents = JSON.parse(result.InventoryControlAgents);
  result.MeasureConverts = JSON.parse(result.MeasureConverts);
  result.MeasureUnits = JSON.parse(result.MeasureUnits);
  result.Stores = JSON.parse(result.Stores);

  res.send(result);
});

router.get("/search/front-side/by-type/:typeID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.SearchFrontSideAccounts ${MemberID}, ${req.params.typeID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/search/front-side/by-id/:accountID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.SearchFrontSideAccountByID ${MemberID}, ${req.params.accountID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/next-step/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.GetProductRequestNextStep ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.NextStep) {
    result.NextStep = JSON.parse(result.NextStep);
    for (const key in result.NextStep) {
      result.NextStep[key] = JSON.parse(result.NextStep[key]);
    }
  }

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.SearchProductRequests ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((request) => {
    request.Items = JSON.parse(request.Items);
    request.Actions = JSON.parse(request.Actions);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.SaveProductRequest ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result = JSON.parse(result.Request);
  result.Items = JSON.parse(result.Items);

  res.send(result);
});

router.post("/feedback", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.RegProductRequestFeedback ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result = JSON.parse(result.Request);
  result.Items = JSON.parse(result.Items);
  result.Actions = JSON.parse(result.Actions);

  res.send(result);
});

router.post("/reject/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.RejectProductRequest ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/approve/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.ApproveProductRequest ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/undo-approve/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.UndoApproveProductRequest ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.DeleteProductRequest ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
