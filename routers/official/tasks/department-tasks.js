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

module.exports = router;
