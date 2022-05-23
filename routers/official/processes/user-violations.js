const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");
const fs = require("fs");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetViolationParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/files/:violationID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetViolationFiles ${MemberID}, ${req.params.violationID}`
  );

  result = result.recordset;

  res.send(result);
});

router.get("/announces", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetAllViolationAnnounces ${MemberID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((announce) => {
    announce.Files = JSON.parse(announce.Files);
    announce.SenderRequestFiles = JSON.parse(announce.SenderRequestFiles);
  });

  res.send(result);
});

router.post("/announce/seen/:announceID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.MakeSeenViolationAnnounce ${MemberID}, ${req.params.announceID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SearchViolations ${MemberID}, N'${JSON.stringify(
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

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveViolation ${MemberID}, N'${JSON.stringify(req.body)}'`
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

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.DeleteViolation ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  result.DeletedFiles = JSON.parse(result.DeletedFiles);

  const baseDir = `./uploaded-files/violation-files`;
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
