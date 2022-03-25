const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/capacity/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.GetExtraWorkRequestCapacity ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.GetOfficialCheckExtraWorkRequestsParams ${MemberID}`
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
    `EXEC TimexAPI.SearchOfficialCheckExtraWorkRequests ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  //---

  result.forEach((request) => {
    request.Employees = JSON.parse(request.Employees);
    request.EmployeesIDs = JSON.parse(request.EmployeesIDs);
  });

  //---

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  console.log(req.body);
  console.log("------------");

  let result = await selectQuery(
    `EXEC TimexAPI.SaveOfficialCheckExtraWorkRequest ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Employees = JSON.parse(result.Employees);
  result.EmployeesIDs = JSON.parse(result.EmployeesIDs);

  //---

  res.send(result);
});

module.exports = router;
