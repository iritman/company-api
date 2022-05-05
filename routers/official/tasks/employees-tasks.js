const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");
const fs = require("fs");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.GetEmployeesTasksParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/files/:taskID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.GetTaskFiles ${MemberID}, ${req.params.taskID}`
  );

  result = result.recordset;

  res.send(result);
});

router.get("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(`EXEC TaskAPI.GetEmployeesTasks ${MemberID}`);

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((task) => {
    task.Tags = JSON.parse(task.Tags);
    task.Reports = JSON.parse(task.Reports);
    task.Reports.forEach((report) => {
      report.TaskReportSeens = JSON.parse(report.TaskReportSeens);
    });
    task.Supervisors = JSON.parse(task.Supervisors);
    task.Files = JSON.parse(task.Files);
    task.ReminderInfo = JSON.parse(task.ReminderInfo);
  });

  res.send(result);
});

// router.post("/search", auth, async (req, res) => {
//   const { searchText } = req.body;
//   const { MemberID } = req.user;

//   let result = await selectQuery(
//     `EXEC TaskAPI.SearchTags ${MemberID}, N'${searchText}'`
//   );

//   result = result.recordset;

//   if (result.length === 1 && result[0].Error)
//     return res.status(400).send(result[0]);

//   res.send(result);
// });

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.SaveEmployeeTask ${MemberID}, N'${JSON.stringify(req.body)}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Tags = JSON.parse(result.Tags);
  result.Reports = JSON.parse(result.Reports);
  result.Reports.forEach((report) => {
    report.TaskReportSeens = JSON.parse(report.TaskReportSeens);
  });
  result.Supervisors = JSON.parse(result.Supervisors);
  result.Files = JSON.parse(result.Files);
  result.ReminderInfo = JSON.parse(result.ReminderInfo);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.DeleteEmployeeTask ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.DeletedFiles = JSON.parse(result.DeletedFiles);

  const baseDir = `./uploaded-files/`;
  let dir = "";

  result.DeletedFiles.forEach((f) => {
    dir = `${baseDir}${f.TypeID === 1 ? "task-files" : "task-report-files"}/${
      f.FileName
    }`;

    if (fs.existsSync(dir)) {
      fs.unlinkSync(dir);
    }
  });

  res.send({ Message: result.Message });
});

module.exports = router;
