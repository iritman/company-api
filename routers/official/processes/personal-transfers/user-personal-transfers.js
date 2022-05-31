const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");
const fs = require("fs");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetPersonalTransferParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/files/:transferID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetPersonalTransferFiles ${MemberID}, ${req.params.transferID}`
  );

  result = result.recordset;

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SearchPersonalTransfers ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((transfer) => {
    transfer.Reports = JSON.parse(transfer.Reports);
    transfer.Reports.forEach(
      (report) => (report.Files = JSON.parse(report.Files))
    );
    transfer.Actions = JSON.parse(transfer.Actions);
    transfer.Actions.forEach((action) => {
      action.Files = JSON.parse(action.Files);
    });
    transfer.Files = JSON.parse(transfer.Files);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SavePersonalTransfer ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Reports = JSON.parse(result.Reports);
  result.Reports.forEach((report) => (report.Files = JSON.parse(report.Files)));
  result.Actions = JSON.parse(result.Actions);
  result.Actions.forEach((action) => {
    action.Files = JSON.parse(action.Files);
  });
  result.Files = JSON.parse(result.Files);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.DeletePersonalTransfer ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  result.DeletedFiles = JSON.parse(result.DeletedFiles);

  const baseDir = `./uploaded-files/personal-transfer-files`;
  let dir = "";

  result.DeletedFiles.forEach((f) => {
    dir = `${baseDir}/${f.FileName}`;

    if (fs.existsSync(dir)) {
      fs.unlinkSync(dir);
    }
  });

  res.send({ Message: result.Message });
});

router.post("/report", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SavePersonalTransferOfficialReport ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  //---

  result.Files = JSON.parse(result.Files);

  //---

  res.send(result);
});

router.post("/response", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveOfficialCheckPersonalTransferResponse ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Reports = JSON.parse(result.Reports);
  result.Reports.forEach((report) => (report.Files = JSON.parse(report.Files)));
  result.Actions = JSON.parse(result.Actions);
  result.Actions.forEach((action) => {
    action.Files = JSON.parse(action.Files);
  });
  result.Files = JSON.parse(result.Files);

  res.send(result);
});

router.delete("/report/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.DeletePersonalTransferOfficialReport ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.DeletedFiles = JSON.parse(result.DeletedFiles);

  const baseDir = `./uploaded-files/personal-transfer-report-files`;
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
