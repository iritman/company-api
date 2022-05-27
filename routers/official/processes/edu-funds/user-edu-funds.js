const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");
const fs = require("fs");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetEduFundParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/files/:fundID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetEduFundFiles ${MemberID}, ${req.params.fundID}`
  );

  result = result.recordset;

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SearchEduFunds ${MemberID}, N'${JSON.stringify(req.body)}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((fund) => {
    fund.Reports = JSON.parse(fund.Reports);
    fund.Reports.forEach((report) => (report.Files = JSON.parse(report.Files)));
    fund.Actions = JSON.parse(fund.Actions);
    fund.Files = JSON.parse(fund.Files);
    fund.ResponseFiles = JSON.parse(fund.ResponseFiles);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveEduFund ${MemberID}, N'${JSON.stringify(req.body)}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Reports = JSON.parse(result.Reports);
  result.Reports.forEach((report) => (report.Files = JSON.parse(report.Files)));
  result.Actions = JSON.parse(result.Actions);
  result.Files = JSON.parse(result.Files);
  result.ResponseFiles = JSON.parse(result.ResponseFiles);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.DeleteEduFund ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  result.DeletedFiles = JSON.parse(result.DeletedFiles);

  const baseDir = `./uploaded-files/edu-fund-files`;
  let dir = "";

  result.DeletedFiles.forEach((f) => {
    dir = `${baseDir}/${f.FileName}`;

    if (fs.existsSync(dir)) {
      fs.unlinkSync(dir);
    }
  });

  res.send({ Message: result.Message });
});

module.exports = router;
