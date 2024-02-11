const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/form/ui/request", auth, async (req, res) => {
  // const { MemberID } = req.user;

  let result = await selectQuery(`EXEC AppAPI.GetFormUI 1`);

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.FormItems = JSON.parse(result.FormItems);
  result.FormItems.forEach((item) => {
    item.DataSource = JSON.parse(item.DataSource);

    if (item.DataSource.length > 0) {
      const first_row = item.DataSource[0];
      const data_source_key_field = Object.keys(first_row)[0];

      // Masalan agar 2 field <FromStoreID> va <ToStoreID> darim ke dar db
      // faghat sotune <StoreID> hast,
      // Ba in ravesh, field morede niaz be data source add mishavad
      if (data_source_key_field !== item.FieldName) {
        item.DataSource.forEach((ds_item) => {
          ds_item[item.FieldName] = ds_item[data_source_key_field];
        });
      }
    }
  });

  res.send(result);
});

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

router.get("/search/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.GetProductRequestSearchParams ${MemberID}`
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
    // request.Items.forEach((itm) => {
    //   itm.Suppliers = JSON.parse(itm.Suppliers);
    //   itm.SuppliersIDs = JSON.parse(itm.SuppliersIDs);
    // });
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

router.post("/item", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.SaveProductRequestItem ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result = JSON.parse(result.SavedItem);
  //   result.Suppliers = JSON.parse(result.Suppliers);

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

router.delete("/item/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.DeleteProductRequestItem ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
