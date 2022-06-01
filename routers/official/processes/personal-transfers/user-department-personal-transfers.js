const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");
const fs = require("fs");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetDepartmentPersonalTransferParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SearchDepartmentPersonalTransfers ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.SearchResult = JSON.parse(result.SearchResult);

  result.SearchResult.forEach((transfer) => {
    // transfer.Actions = JSON.parse(transfer.Actions);
    transfer.Actions.forEach((action) => {
      action.Files = JSON.parse(action.Files);
    });
    transfer.Files = JSON.parse(transfer.Files);
  });

  res.send(result);
});

router.post("/response", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveDepartmentPersonalTransferResponse ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Actions = JSON.parse(result.Actions);
  result.Actions.forEach((action) => {
    action.Files = JSON.parse(action.Files);
  });
  result.Files = JSON.parse(result.Files);

  res.send(result);
});

module.exports = router;
