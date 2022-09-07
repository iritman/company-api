const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");
const fs = require("fs");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.GetDepartmentTasksParams ${MemberID}`
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
    `EXEC TaskAPI.SearchDepartmentTasks ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((task) => {
    task.Tags = JSON.parse(task.Tags);
    task.Reports = JSON.parse(task.Reports);
    task.Reports.forEach((report) => {
      report.TaskReportSeens = JSON.parse(report.TaskReportSeens);
      report.Files = JSON.parse(report.Files);
    });
    task.Supervisors = JSON.parse(task.Supervisors);
    task.Files = JSON.parse(task.Files);
    task.ReminderInfo = JSON.parse(task.ReminderInfo);
  });

  res.send(result);
});

router.post("/report", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.SaveReportInDepartmentTask ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  result.forEach((report) => {
    report.TaskReportSeens = JSON.parse(report.TaskReportSeens);
    report.Files = JSON.parse(report.Files);
  });

  res.send(result);
});

router.post("/report/seen/:taskID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.MakeReportsSeenInDepartmentTask ${MemberID}, N'${req.params.taskID}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/report/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.DeleteTaskReportInDepartmentTask ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.DeletedFiles = JSON.parse(result.DeletedFiles);

  const baseDir = `./uploaded-files/task-report-files`;
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
