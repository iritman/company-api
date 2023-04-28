const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");

// []
router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetPaymentReceiptsParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

// []
router.get("/items/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetPaymentReceiptItemsParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

// []
router.get("/account/:accountID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchPaymentReceiptFrontSideAccountByID ${MemberID}, ${req.params.accountID}`
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

// []
router.post("/accounts", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchPaymentReceiptFrontSideAccounts ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

// []
router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchPaymentReceipts ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((request) => {
    request.Cheques = JSON.parse(request.Cheques);
    // request.Cheques.forEach((cheque) => {
    //   if (cheque.RequestInfo.length > 0)
    //     cheque.RequestInfo = JSON.parse(cheque.RequestInfo);
    // });

    request.Demands = JSON.parse(request.Demands);
    request.Cashes = JSON.parse(request.Cashes);
    request.WithdrawNotices = JSON.parse(request.WithdrawNotices);
    request.TransferToOthers = JSON.parse(request.TransferToOthers);
    request.RefundReceivedCheques = JSON.parse(request.RefundReceivedCheques);
    request.RefundReceivedDemands = JSON.parse(request.RefundReceivedDemands);
  });

  res.send(result);
});

// []
router.get("/search/orders", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchPaymentOrdersInPaymentReceipt ${MemberID}`
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
    request.WithdrawNotices = JSON.parse(request.WithdrawNotices);
    request.TransferToOthers = JSON.parse(request.TransferToOthers);
    request.RefundReceivedCheques = JSON.parse(request.RefundReceivedCheques);
    request.RefundReceivedDemands = JSON.parse(request.RefundReceivedDemands);
  });

  res.send(result);
});

// []
router.get(
  "/company-cheques/white/:companyBankAccountID",
  auth,
  async (req, res) => {
    const { MemberID } = req.user;

    let result = await selectQuery(
      `EXEC Financial_TreasuryAPI.GetWhiteCompanyCheques ${MemberID}, ${req.params.companyBankAccountID}`
    );

    result = result.recordset;

    if (result.length === 1 && result[0].Error)
      return res.status(400).send(result[0]);

    res.send(result);
  }
);

// []
router.get(
  "/received-cheques/transfer-to-others/:cashBoxID",
  auth,
  async (req, res) => {
    const { MemberID } = req.user;

    let result = await selectQuery(
      `EXEC Financial_TreasuryAPI.GetPaymentReceiptTransferToOtherCheques ${MemberID}, ${req.params.cashBoxID}`
    );

    result = result.recordset[0];

    if (result.Error) return res.status(400).send(result);

    res.send(result.Cheques);
  }
);

// []
router.get(
  "/received-cheque/transfer-to-others/:chequeID",
  auth,
  async (req, res) => {
    const { MemberID } = req.user;

    let result = await selectQuery(
      `EXEC Financial_TreasuryAPI.GetPaymentReceiptTransferToOtherChequeByID ${MemberID}, ${req.params.chequeID}`
    );

    result = result.recordset[0];

    if (result.Error) return res.status(400).send(result);

    res.send(result);
  }
);

// []
router.get(
  "/received-cheques/refund/:cashBoxID/:frontSideAccountID",
  auth,
  async (req, res) => {
    const { MemberID } = req.user;
    const { cashBoxID, frontSideAccountID } = req.params;

    let result = await selectQuery(
      `EXEC Financial_TreasuryAPI.GetPaymentReceiptRefundReceived_Cheques ${MemberID}, ${cashBoxID}, ${frontSideAccountID}`
    );

    result = result.recordset[0];

    if (result.Error) return res.status(400).send(result);

    res.send(result.Cheques);
  }
);

// []
router.get("/received-cheque/refund/:chequeID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetPaymentReceiptRefundReceivedChequeByID ${MemberID}, ${req.params.chequeID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

// []
router.get(
  "/received-demands/refund/:cashBoxID/:frontSideAccountID",
  auth,
  async (req, res) => {
    const { MemberID } = req.user;
    const { cashBoxID, frontSideAccountID } = req.params;

    let result = await selectQuery(
      `EXEC Financial_TreasuryAPI.GetPaymentReceiptRefundReceived_Demands ${MemberID}, ${cashBoxID}, ${frontSideAccountID}`
    );

    result = result.recordset[0];

    if (result.Error) return res.status(400).send(result);

    res.send(result.Demands);
  }
);

// []
router.get("/received-demand/refund/:demandID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetPaymentReceiptRefundReceivedDemandByID ${MemberID}, ${req.params.demandID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

// []
router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SavePaymentReceipt ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Cheques = JSON.parse(result.Cheques);
  result.Cheques.forEach((cheque) => {
    if (cheque.RequestInfo?.length > 0)
      cheque.RequestInfo = JSON.parse(cheque.RequestInfo);
  });

  result.Demands = JSON.parse(result.Demands);
  result.Cashes = JSON.parse(result.Cashes);
  result.WithdrawNotices = JSON.parse(result.WithdrawNotices);
  result.TransferToOthers = JSON.parse(result.TransferToOthers);
  result.RefundReceivedCheques = JSON.parse(result.RefundReceivedCheques);
  result.RefundReceivedDemands = JSON.parse(result.RefundReceivedDemands);

  res.send(result);
});

router.post("/item/:itemType", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { itemType } = req.params;

  let sp = "";
  switch (itemType) {
    case "cheque":
      sp = "SavePaymentReceiptCheque";
      break;
    case "demand":
      sp = "SavePaymentReceiptDemand";
      break;
    case "cash":
      sp = "SavePaymentReceiptCash";
      break;
    case "withdraw-notice":
      sp = "SavePaymentReceiptWithdrawNotice";
      break;
    case "transfer-to-other":
      sp = "SavePaymentReceiptTransferToOther";
      break;
    case "refund-received-cheque":
      sp = "SavePaymentReceiptRefundReceivedCheque";
      break;
    case "refund-received-demand":
      sp = "SavePaymentReceiptRefundReceivedDemand";
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

// []
router.post("/reject/:receiptID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.RejectPaymentReceipt ${MemberID}, ${req.params.receiptID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

// []
router.post("/approve/:receiptID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.ApprovePaymentReceipt ${MemberID}, ${req.params.receiptID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

// []
router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.DeletePaymentReceipt ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

// []
router.delete("/:itemType/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { itemType, recordID } = req.params;

  let sp = "";
  switch (itemType) {
    case "cheque":
      sp = "DeletePaymentReceiptCheque";
      break;
    case "demand":
      sp = "DeletePaymentReceiptDemand";
      break;
    case "cash":
      sp = "DeletePaymentReceiptCash";
      break;
    case "withdraw-notice":
      sp = "DeletePaymentReceiptWithdrawNotice";
      break;
    case "transfer-to-other":
      sp = "DeletePaymentReceiptTransferToOther";
      break;
    case "refund-received-cheque":
      sp = "DeletePaymentReceiptRefundReceivedCheque";
      break;
    case "refund-received-demand":
      sp = "DeletePaymentReceiptRefundReceivedDemand";
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
