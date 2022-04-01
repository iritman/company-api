const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.GetOfficialCheckMembersMissionsParams ${MemberID}`
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
    `EXEC TimexAPI.SearchOfficialCheckMembersMissions ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((mission) => {
    if (mission.VehicleInfo.length > 0) {
      mission.VehicleInfo = JSON.parse(mission.VehicleInfo);
    }

    mission.ReportInfo = JSON.parse(mission.ReportInfo);
    mission.Notes = JSON.parse(mission.Notes);
    mission.Actions = JSON.parse(mission.Actions);
  });

  res.send(result);
});

router.post("/note", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.SaveMissionNoteForOfficial ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  //---

  if (result.VehicleInfo.length > 0) {
    result.VehicleInfo = JSON.parse(result.VehicleInfo);
  }

  result.ReportInfo = JSON.parse(result.ReportInfo);
  result.Notes = JSON.parse(result.Notes);
  result.Actions = JSON.parse(result.Actions);

  //---

  res.send(result);
});

router.delete("/note/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.DeleteMissionNoteForOfficial ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  if (result.VehicleInfo.length > 0) {
    result.VehicleInfo = JSON.parse(result.VehicleInfo);
  }

  result.ReportInfo = JSON.parse(result.ReportInfo);
  result.Notes = JSON.parse(result.Notes);
  result.Actions = JSON.parse(result.Actions);

  res.send(result);
});

module.exports = router;
