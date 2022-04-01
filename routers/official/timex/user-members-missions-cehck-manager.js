const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/role", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(`EXEC TimexAPI.GetMemberRole ${MemberID}`);

  result = result.recordset[0];

  res.send(result);
});

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.GetManagerNewMissionRequestsParams ${MemberID}`
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
    `EXEC TimexAPI.SearchManagerNewMissionRequests ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((vacation) => {
    vacation.Actions = JSON.parse(vacation.Actions);
  });

  res.send(result);
});

router.post("/response", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.SaveMissionManagerResponse ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Actions = JSON.parse(result.Actions);

  res.send(result);
});

router.get("/reports/new", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.SearchNewMissionReports ${MemberID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result);

  result.forEach((mission) => {
    if (mission.VehicleInfo.length > 0)
      mission.VehicleInfo = JSON.parse(mission.VehicleInfo);

    mission.ReportInfo = JSON.parse(mission.ReportInfo);
    mission.Notes = JSON.parse(mission.Notes);
    mission.Actions = JSON.parse(mission.Actions);
  });

  console.log();

  res.send(result);
});

router.post("/report/response", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.SaveMissionReportRespone ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  if (result.VehicleInfo.length > 0)
    result.VehicleInfo = JSON.parse(result.VehicleInfo);

  result.ReportInfo = JSON.parse(result.ReportInfo);
  result.Notes = JSON.parse(result.Notes);
  result.Actions = JSON.parse(result.Actions);

  res.send(result);
});

module.exports = router;
