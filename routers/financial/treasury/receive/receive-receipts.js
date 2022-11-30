const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetReceiveReceiptsParams ${MemberID}`
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
    `EXEC Financial_TreasuryAPI.GetReceiveParams ${MemberID}`
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
    `EXEC Financial_TreasuryAPI.SearchReceiveFrontSideAccountByID ${MemberID}, ${req.params.accountID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/accounts", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchReceiveFrontSideAccounts ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.post("/delivery-members", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchReceiveReceiptDeliveryMembers ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchReceiveReceipts ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((request) => {
    request.Cheques = JSON.parse(request.Cheques);
    request.Demands = JSON.parse(request.Demands);
    request.Cashes = JSON.parse(request.Cashes);
    request.PaymentNotices = JSON.parse(request.PaymentNotices);
    request.ReturnFromOthers = JSON.parse(request.ReturnFromOthers);
    request.ReturnPayableCheques = JSON.parse(request.ReturnPayableCheques);
    request.ReturnPayableDemands = JSON.parse(request.ReturnPayableDemands);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SaveReceiveReceipt ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Cheques = JSON.parse(result.Cheques);
  result.Demands = JSON.parse(result.Demands);
  result.Cashes = JSON.parse(result.Cashes);
  result.PaymentNotices = JSON.parse(result.PaymentNotices);
  result.ReturnFromOthers = JSON.parse(result.ReturnFromOthers);
  result.ReturnPayableCheques = JSON.parse(result.ReturnPayableCheques);
  result.ReturnPayableDemands = JSON.parse(result.ReturnPayableDemands);

  res.send(result);
});

router.post("/item/:itemType", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { itemType } = req.params;

  let sp = "";
  switch (itemType) {
    case "cheque":
      sp = "SaveReceiveCheque";
      break;
    case "demand":
      sp = "SaveReceiveDemand";
      break;
    case "cash":
      sp = "SaveReceiveCash";
      break;
    case "payment-notice":
      sp = "SaveReceivePaymentNotice";
      break;
    case "return-from-other":
      sp = "SaveReceiveReturnFromOther";
      break;
    case "return-payable-cheque":
      sp = "SaveReceiveReturnPayableCheque";
      break;
    case "return-payable-demand":
      sp = "SaveReceiveReturnPayableDemand";
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

  res.send(result);
});

router.post("/reject/:receiveID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.RejectReceiveReceipt ${MemberID}, ${req.params.receiveID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/approve/:receiveID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.ApproveReceiveReceipt ${MemberID}, ${req.params.receiveID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.DeleteReceiveReceipt ${MemberID}, ${req.params.recordID}`
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
      sp = "DeleteReceiveCheque";
      break;
    case "demand":
      sp = "DeleteReceiveDemand";
      break;
    case "cash":
      sp = "DeleteReceiveCash";
      break;
    case "payment-notice":
      sp = "DeleteReceivePaymentNotice";
      break;
    case "return-from-other":
      sp = "DeleteReceiveReturnFromOther";
      break;
    case "return-payable-cheque":
      sp = "DeleteReceiveReturnPayableCheque";
      break;
    case "return-payable-demand":
      sp = "DeleteReceiveReturnPayableDemand";
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
