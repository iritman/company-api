const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetPurchaseRequestsParams ${MemberID}`
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
    `EXEC Logistic_PurchaseAPI.GetPurchaseRequestSearchParams ${MemberID}`
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
    `EXEC Logistic_PurchaseAPI.GetPurchaseRequestItemsParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.post("/search/members", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC OrgAPI.SearchMembersAsParams ${MemberID}, N'PurchaseRequests', N'${req.body.searchText}'`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/search/member/:memberID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SearchMemberByID ${MemberID}, ${req.params.memberID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/search/front-side/:typeID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SearchFrontSideAccounts ${MemberID}, ${req.params.typeID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/search/front-side/:accountID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SearchFrontSideAccountByID ${MemberID}, ${req.params.accountID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/accounts", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SearchPurchaseRequestFrontSideAccounts ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SearchPurchaseRequests ${MemberID}, N'${JSON.stringify(
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
    `EXEC Logistic_PurchaseAPI.SavePurchaseRequest ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Items = JSON.parse(result.Items);

  res.send(result);
});

router.post("/item", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SavePurchaseRequestItem ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/reject/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.RejectPurchaseRequest ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/approve/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.ApprovePurchaseRequest ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/undo-approve/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.UndoApprovePurchaseRequest ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.DeletePurchaseRequest ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/item/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.DeletePurchaseRequestItem ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
