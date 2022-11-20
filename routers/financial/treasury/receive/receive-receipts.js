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
    request.Items = JSON.parse(request.Items);
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

  result.Items = JSON.parse(result.Items);

  res.send(result);
});

router.post("/cheque", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SaveReceiveCheque ${MemberID}, N'${JSON.stringify(
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
