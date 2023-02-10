const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_DocsAPI.GetVouchersParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  result.Moeins.forEach((moein) => {
    moein.TafsilAccounts_Level4 = JSON.parse(moein.TafsilAccounts_Level4);
    moein.TafsilAccounts_Level5 = JSON.parse(moein.TafsilAccounts_Level5);
    moein.TafsilAccounts_Level6 = JSON.parse(moein.TafsilAccounts_Level6);
  });

  res.send(result);
});

// router.get("/", auth, async (req, res) => {
//   const { MemberID } = req.user;

//   let result = await selectQuery(
//     `EXEC Financial_DocsAPI.GetAllFunds ${MemberID}`
//   );

//   result = result.recordset;

//   if (result.length === 1 && result[0].Error)
//     return res.status(400).send(result[0]);

//   result.forEach((row) => {
//     if (row.TafsilInfo.length > 0) row.TafsilInfo = JSON.parse(row.TafsilInfo);
//   });

//   res.send(result);
// });

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_DocsAPI.SearchVouchers ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((row) => {
    row.Items = JSON.parse(row.Items);
    row.Logs = JSON.parse(row.Logs);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_DocsAPI.SaveVoucher ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Items = JSON.parse(result.Items);
  result.Logs = JSON.parse(result.Logs);

  res.send(result);
});

router.post("/item", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_DocsAPI.SaveVoucherItem ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_DocsAPI.DeleteVoucher ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/item/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { recordID } = req.params;

  let result = await selectQuery(
    `EXEC Financial_DocsAPI.DeleteVoucherItem ${MemberID}, ${recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
