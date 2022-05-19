const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");
const fs = require("fs");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetOfficialCheckDismissalParams ${MemberID}`
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
    `EXEC ProcessAPI.SearchOfficialCheckDismissals ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((dismissal) => {
    dismissal.Reports = JSON.parse(dismissal.Reports);
    dismissal.Reports.forEach(
      (report) => (report.Files = JSON.parse(report.Files))
    );
    dismissal.Actions = JSON.parse(dismissal.Actions);
    dismissal.Files = JSON.parse(dismissal.Files);
  });

  res.send(result);
});

router.post("/response", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveDismissalOfficialResponse ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Reports = JSON.parse(result.Reports);
  result.Reports.forEach((report) => (report.Files = JSON.parse(report.Files)));
  result.Actions = JSON.parse(result.Actions);
  result.Files = JSON.parse(result.Files);

  res.send(result);
});

router.post("/report", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveDismissalOfficialReport ${MemberID}, N'${JSON.stringify(
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

router.delete("/report/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.DeleteDismissalOfficialReport ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.DeletedFiles = JSON.parse(result.DeletedFiles);

  const baseDir = `./uploaded-files/dismissal-report-files`;
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
