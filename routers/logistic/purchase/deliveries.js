const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetPurchaseDeliveryParams ${MemberID}`
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
    `EXEC SupplyAPI.GetPurchaseDeliverySearchParams ${MemberID}`
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
    `EXEC SupplyAPI.GetPurchaseDeliveryItemParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/order-items", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetRegedOrderItemsForDelivery ${MemberID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.get("/order-item/:itemID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.GetRegedOrderItemByIDForDelivery ${MemberID}, ${req.params.itemID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/search/transferees", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC SupplyAPI.SearchDeliveryTransferees ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.get("/search/transferee/:id", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.SearchDeliveryTransfereeByID ${MemberID}, ${req.params.id}`
  );

  result = result.recordset[0];

  if (result && result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/search/delivery-persons", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC SupplyAPI.SearchDeliveryPersons ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.get("/search/delivery-person/:id", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.SearchDeliveryPersonByID ${MemberID}, ${req.params.id}`
  );

  result = result.recordset[0];

  if (result && result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/search/front-side-accounts", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC SupplyAPI.SearchDeliveryFrontSideAccounts ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.get("/search/front-side-account/:id", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.SearchDeliveryFrontSideAccountByID ${MemberID}, ${req.params.id}`
  );

  result = result.recordset[0];

  if (result && result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/search/products", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;
  console.log(
    `EXEC SupplyAPI.SearchDeliveryProducts ${MemberID}, N'${searchText}'`
  );
  let result = await selectQuery(
    `EXEC SupplyAPI.SearchDeliveryProducts ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((row) => {
    row.MeasureUnits = JSON.parse(row.MeasureUnits);
  });

  res.send(result);
});

router.get("/search/product/:id", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.SearchDeliveryProductByID ${MemberID}, ${req.params.id}`
  );

  result = result.recordset[0];

  if (result && result.Error) return res.status(400).send(result);

  result.MeasureUnits = JSON.parse(result.MeasureUnits);

  res.send(result);
});

router.get(
  "/search/tafsil-account/:typeID/:accountID",
  auth,
  async (req, res) => {
    const { MemberID } = req.user;
    const { typeID, accountID } = req.params;

    let result = await selectQuery(
      `EXEC SupplyAPI.SearchDeliveryTafsilAccountByID ${MemberID}, ${typeID}, ${accountID}`
    );

    result = result.recordset[0];

    if (result.Error) return res.status(400).send(result);

    res.send(result);
  }
);

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.SearchPurchaseDeliveries ${MemberID}, N'${JSON.stringify(
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
    `EXEC SupplyAPI.SavePurchaseDelivery ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result = JSON.parse(result.Delivery);
  result.Items = JSON.parse(result.Items);

  res.send(result);
});

router.post("/item", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.SavePurchaseDeliveryItem ${MemberID}, N'${JSON.stringify(
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
    `EXEC SupplyAPI.RejectPurchaseDelivery ${MemberID}, ${req.params.orderID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/approve/:orderID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.ApprovePurchaseDelivery ${MemberID}, ${req.params.orderID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/undo-approve/:orderID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.UndoApprovePurchaseDelivery ${MemberID}, ${req.params.orderID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.DeletePurchaseDelivery ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/item/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC SupplyAPI.DeletePurchaseDeliveryItem ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
