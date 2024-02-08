const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetPurchaseOrderParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/search/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetPurchaseOrderSearchParams ${MemberID}`
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
    `EXEC SupplyAPI.GetPurchaseOrderItemParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/invoices/:supplierID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetRegedInvoicesForOrder ${MemberID}, ${req.params.supplierID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/invoice/:invoiceID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetRegedInvoiceByIDForOrder ${MemberID}, ${req.params.invoiceID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/command/items/:invoiceID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetRegedCommandItemsForOrder ${MemberID}, ${req.params.invoiceID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.get("/command/item/:invoiceItemID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetRegedCommandItemByIDForOrder ${MemberID}, ${req.params.invoiceItemID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/purchase-request/items", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetRegedPurchaseRequestItemsForOrder ${MemberID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.get("/product/:productID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetProductForOrder ${MemberID}, ${req.params.productID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.MeasureUnits = JSON.parse(result.MeasureUnits);

  res.send(result);
});

router.get("/purchase-request/item/:itemID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetRegedPurchaseRequestItemByIDForOrder ${MemberID}, ${req.params.itemID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/search/products", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetProductsForOrder ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((row) => {
    row.MeasureUnits = JSON.parse(row.MeasureUnits);
  });

  res.send(result);
});

router.get("/command/items-for-order/:commandID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetValidCommandItemsForOrder ${MemberID}, ${req.params.commandID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((row) => (row.Suppliers = JSON.parse(row.Suppliers)));

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.SearchPurchaseOrders ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((request) => {
    request.Items = JSON.parse(request.Items);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.SavePurchaseOrder ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result = JSON.parse(result.Order);
  result.Items = JSON.parse(result.Items);

  res.send(result);
});

router.post("/item", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.SavePurchaseOrderItem ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result.SavedItem);
});

router.post("/reject/:orderID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.RejectPurchaseOrder ${MemberID}, ${req.params.orderID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/approve/:orderID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.ApprovePurchaseOrder ${MemberID}, ${req.params.orderID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/undo-approve/:orderID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.UndoApprovePurchaseOrder ${MemberID}, ${req.params.orderID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.DeletePurchaseOrder ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/item/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.DeletePurchaseOrderItem ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
