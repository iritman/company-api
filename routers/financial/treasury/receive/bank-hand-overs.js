const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetBankHandOversParams ${MemberID}`
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

router.get("/cheques/:company_bank_account_id", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { company_bank_account_id } = req.params;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetBankHandOverCheques ${MemberID}, ${company_bank_account_id}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Cheques = JSON.parse(result.Cheques);

  res.send(result);
});

router.get("/demands/:company_bank_account_id", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { company_bank_account_id } = req.params;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.GetBankHandOverDemands ${MemberID}, ${company_bank_account_id}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Demands = JSON.parse(result.Demands);

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SearchBankHandOvers ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((request) => {
    request.Cheques = JSON.parse(request.Cheques);
    request.Demands = JSON.parse(request.Demands);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SaveBankHandOver ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Cheques = JSON.parse(result.Cheques);
  result.Demands = JSON.parse(result.Demands);

  res.send(result);
});

router.post("/item/:itemType", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { itemType } = req.params;

  let sp = "";
  switch (itemType) {
    case "cheque":
      sp = "SaveBankHandOverCheque";
      break;
    case "demand":
      sp = "SaveBankHandOverDemand";
      break;
    default:
      sp = "";
      break;
  }
  console.log(
    `EXEC Financial_TreasuryAPI.${sp} ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );
  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.${sp} ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/reject/:handOverID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.RejectBankHandOver ${MemberID}, ${req.params.handOverID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/approve/:handOverID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.ApproveBankHandOver ${MemberID}, ${req.params.handOverID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/undo-approve/:handOverID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.UndoApproveBankHandOver ${MemberID}, ${req.params.handOverID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/submit-voucher/:handOverID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.SubmitVoucherBankHandOver ${MemberID}, ${req.params.handOverID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/delete-voucher/:handOverID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.DeleteVoucherBankHandOver ${MemberID}, ${req.params.handOverID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/view-voucher/:voucherID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_TreasuryAPI.ViewVoucherBankHandOver ${MemberID}, ${req.params.voucherID}`
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
    `EXEC Financial_TreasuryAPI.DeleteBankHandOver ${MemberID}, ${req.params.recordID}`
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
      sp = "DeleteBankHandOverCheque";
      break;
    case "demand":
      sp = "DeleteBankHandOverDemand";
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
