const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetPaymentOrdersParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/items/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetPaymentParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/account/:accountID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchPaymentFrontSideAccountByID ${MemberID}, ${req.params.accountID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/request/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchPaymentRequestByID ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/accounts", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchPaymentFrontSideAccounts ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchPaymentOrders ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((request) => {
    request.Cheques = JSON.parse(request.Cheques);
    request.Cheques.forEach((cheque) => {
      if (cheque.RequestInfo.length > 0)
        cheque.RequestInfo = JSON.parse(cheque.RequestInfo);
    });

    request.Demands = JSON.parse(request.Demands);
    request.Cashes = JSON.parse(request.Cashes);
    request.ReceiveNotices = JSON.parse(request.ReceiveNotices);
    request.PayToOthers = JSON.parse(request.PayToOthers);
    request.ReturnGetableCheques = JSON.parse(request.ReturnGetableCheques);
    request.ReturnGetableDemands = JSON.parse(request.ReturnGetableDemands);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SavePaymentOrder ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Cheques = JSON.parse(result.Cheques);
  result.Cheques.forEach((cheque) => {
    if (cheque.RequestInfo.length > 0)
      cheque.RequestInfo = JSON.parse(cheque.RequestInfo);
  });

  result.Demands = JSON.parse(result.Demands);
  result.Cashes = JSON.parse(result.Cashes);
  result.ReceiveNotices = JSON.parse(result.ReceiveNotices);
  result.PayToOthers = JSON.parse(result.PayToOthers);
  result.ReturnGetableCheques = JSON.parse(result.ReturnGetableCheques);
  result.ReturnGetableDemands = JSON.parse(result.ReturnGetableDemands);

  res.send(result);
});

router.post("/item/:itemType", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { itemType } = req.params;

  let sp = "";
  switch (itemType) {
    case "cheque":
      sp = "SavePaymentCheque";
      break;
    case "demand":
      sp = "SavePaymentDemand";
      break;
    case "cash":
      sp = "SavePaymentCash";
      break;
    case "receive-notice":
      sp = "SavePaymentReceiveNotice";
      break;
    case "pay-to-other":
      sp = "SavePaymentPayToOther";
      break;
    case "return-payable-cheque":
      sp = "SavePaymentReturnGetableCheque";
      break;
    case "return-payable-demand":
      sp = "SavePaymentReturnGetableDemand";
      break;
    default:
      sp = "";
      break;
  }

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.${sp} ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  if (result.RequestInfo && result.RequestInfo.length > 0)
    result.RequestInfo = JSON.parse(result.RequestInfo);

  res.send(result);
});

router.post("/reject/:receiveID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.RejectPaymentOrder ${MemberID}, ${req.params.receiveID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/approve/:receiveID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.ApprovePaymentOrder ${MemberID}, ${req.params.receiveID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.DeletePaymentOrder ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:itemType/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { itemType, recordID } = req.params;

  let sp = "";
  switch (itemType) {
    case "cheque":
      sp = "DeletePaymentCheque";
      break;
    case "demand":
      sp = "DeletePaymentDemand";
      break;
    case "cash":
      sp = "DeletePaymentCash";
      break;
    case "receive-notice":
      sp = "DeletePaymentReceiveNotice";
      break;
    case "pay-to-other":
      sp = "DeletePaymentPayToOther";
      break;
    case "return-payable-cheque":
      sp = "DeletePaymentReturnGetableCheque";
      break;
    case "return-payable-demand":
      sp = "DeletePaymentReturnGetableDemand";
      break;
    default:
      sp = "";
      break;
  }

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.${sp} ${MemberID}, ${recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
