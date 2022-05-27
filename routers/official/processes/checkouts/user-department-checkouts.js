const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");
const fs = require("fs");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetDepartmentCheckoutParams ${MemberID}`
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
    `EXEC ProcessAPI.SearchDepartmentCheckouts ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((violation) => {
    violation.Reports = JSON.parse(violation.Reports);
    violation.Reports.forEach(
      (report) => (report.Files = JSON.parse(report.Files))
    );
    violation.Actions = JSON.parse(violation.Actions);
    violation.Files = JSON.parse(violation.Files);
    violation.ResponseFiles = JSON.parse(violation.ResponseFiles);
    if (violation.AnnounceInfo) {
      violation.AnnounceInfo = JSON.parse(violation.AnnounceInfo);
      violation.AnnounceInfo.Files = JSON.parse(violation.AnnounceInfo.Files);
    }
  });

  res.send(result);
});

router.post("/response", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveDepartmentCheckoutResponse ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Reports = JSON.parse(result.Reports);
  result.Reports.forEach((report) => (report.Files = JSON.parse(report.Files)));
  result.Actions = JSON.parse(result.Actions);
  result.Files = JSON.parse(result.Files);
  result.ResponseFiles = JSON.parse(result.ResponseFiles);
  if (result.AnnounceInfo) {
    result.AnnounceInfo = JSON.parse(result.AnnounceInfo);
    result.AnnounceInfo.Files = JSON.parse(result.AnnounceInfo.Files);
  }

  res.send(result);
});

module.exports = router;
