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

router.get("/refund/from-other/:chequeID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetReceiveReceiptRefundFromOtherChequeByID ${MemberID}, ${req.params.chequeID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get(
  "/refund/from-other/:cashBoxID/:chequeStatusID/:frontSideAccountID",
  auth,
  async (req, res) => {
    const { MemberID } = req.user;
    const { cashBoxID, chequeStatusID, frontSideAccountID } = req.params;

    let result = await selectQuery(
      `EXEC Financial_TreasuryAPI.GetReceiveRefundFromOther_Cheques ${MemberID}, ${cashBoxID}, ${chequeStatusID}, ${frontSideAccountID}`
    );

    result = result.recordset[0];

    if (result.Error) return res.status(400).send(result);

    res.send(result.Cheques);
  }
);

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
    if (request.RequestInfo.length > 0)
      request.RequestInfo = JSON.parse(request.RequestInfo);

    request.Cheques = JSON.parse(request.Cheques);
    request.Demands = JSON.parse(request.Demands);
    request.Cashes = JSON.parse(request.Cashes);
    request.PaymentNotices = JSON.parse(request.PaymentNotices);
    request.RefundFromOtherCheques = JSON.parse(request.RefundFromOtherCheques);
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

  if (result.RequestInfo.length > 0)
    result.RequestInfo = JSON.parse(result.RequestInfo);
  result.Cheques = JSON.parse(result.Cheques);
  result.Demands = JSON.parse(result.Demands);
  result.Cashes = JSON.parse(result.Cashes);
  result.PaymentNotices = JSON.parse(result.PaymentNotices);
  result.RefundFromOtherCheques = JSON.parse(result.RefundFromOtherCheques);
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
    case "refund-from-other-cheque":
      sp = "SaveReceiveRefundFromOtherCheque";
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

router.post("/undo-approve/:receiveID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.UndoApproveReceiveReceipt ${MemberID}, ${req.params.receiveID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/submit-voucher/:receiveID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SubmitVoucherReceiveReceipt ${MemberID}, ${req.params.receiveID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/delete-voucher/:receiveID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.DeleteVoucherReceiveReceipt ${MemberID}, ${req.params.receiveID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/view-voucher/:voucherID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.ViewVoucherReceiveReceipt ${MemberID}, ${req.params.voucherID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Items = JSON.parse(result.Items);
  result.Logs = JSON.parse(result.Logs);

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
    case "refund-from-other-cheque":
      sp = "DeleteReceiveRefundFromOtherCheque";
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
  console.log(result);
  res.send(result);
});

module.exports = router;
