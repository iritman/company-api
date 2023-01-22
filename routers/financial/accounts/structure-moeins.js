const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_AccountsAPI.GetStructureMoeinsParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/new-code/:totalID", auth, async (req, res) => {
  let result = await selectQuery(
    `SELECT Financial_AccountsAPI.GetNewStructureMoeinCode(${req.params.totalID}) AS NewCode`
  );

  result = result.recordset[0];

  res.send(result);
});

router.get("/:totalID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_AccountsAPI.GetAllStructureMoeins ${MemberID}, ${req.params.totalID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((moein) => {
    moein.TafsilTypes = JSON.parse(moein.TafsilTypes);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_AccountsAPI.SaveStructureMoein ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.TafsilTypes = JSON.parse(result.TafsilTypes);
  result.TafsilTypes.forEach((tt) => {
    tt.TafsilTypes = JSON.parse(tt.TafsilTypes);
  });

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_AccountsAPI.DeleteStructureMoein ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
