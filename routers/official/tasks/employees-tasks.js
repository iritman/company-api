const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

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

// router.get("/", auth, async (req, res) => {
//   const { MemberID } = req.user;

//   let result = await selectQuery(`EXEC TaskAPI.GetAllTags ${MemberID}`);

//   result = result.recordset;

//   if (result.length === 1 && result[0].Error)
//     return res.status(400).send(result[0]);

//   res.send(result);
// });

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

  result.TaskTags = JSON.parse(result.TaskTags);
  result.TaskReports = JSON.parse(result.TaskReports);
  result.TaskReportSeens = JSON.parse(result.TaskReportSeens);
  result.TaskSupervisors = JSON.parse(result.TaskSupervisors);
  result.TaskFiles = JSON.parse(result.TaskFiles);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.DeleteEmployeeTask ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
