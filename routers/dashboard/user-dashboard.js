const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { selectQuery } = require("../../startup/db");

router.get("/timex", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.GetUserTimexDashboardStatistics ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/task", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.GetUserTasksDashboardStatistics ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.MyColleagues = JSON.parse(result.MyColleagues);

  res.send(result);
});

router.get(
  "/task/:departmentID/:calculateSubDepartments",
  auth,
  async (req, res) => {
    const { MemberID } = req.user;
    const { departmentID, calculateSubDepartments } = req.params;

    let result = await selectQuery(
      `EXEC TaskAPI.GetDepartmentTasksDashboardStatistics ${MemberID}, ${departmentID}, ${
        calculateSubDepartments === true
      }`
    );

    result = result.recordset[0];

    if (result.Error) return res.status(400).send(result);

    result.MyColleagues = JSON.parse(result.MyColleagues);

    res.send(result);
  }
);

router.get("/task/departments", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TaskAPI.GetMemberDepartmentInfo ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Message) return res.send(result);

  result.Departments = JSON.parse(result.Departments);

  res.send(result);
});

module.exports = router;
