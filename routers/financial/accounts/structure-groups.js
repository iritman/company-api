const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_AccountsAPI.GetStructureGroupsParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/new-code", auth, async (req, res) => {
  let result = await selectQuery(
    `SELECT Financial_AccountsAPI.GetNewStructureGroupCode() AS NewCode`
  );

  result = result.recordset[0];

  res.send(result);
});

router.get("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_AccountsAPI.GetAllStructureGroups ${MemberID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((group) => {
    group.Totals = JSON.parse(group.Totals);

    group.Totals.forEach((total) => {
      total.Moeins = JSON.parse(total.Moeins);

      total.Moeins.forEach((moein) => {
        moein.TafsilTypes = JSON.parse(moein.TafsilTypes);

        moein.TafsilTypes.forEach((tt) => {
          tt.TafsilTypes = JSON.parse(tt.TafsilTypes);
        });
      });
    });
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_AccountsAPI.SaveStructureGroup ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Totals = JSON.parse(result.Totals);

  result.Totals.forEach((total) => {
    total.Moeins = JSON.parse(total.Moeins);
  });

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_AccountsAPI.DeleteStructureGroup ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
