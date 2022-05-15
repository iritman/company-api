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

module.exports = router;
