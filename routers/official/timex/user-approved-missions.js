const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/current-date", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(`EXEC TimexAPI.GetCurrentDate`);

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.GetApprovedMissionsParams ${MemberID}`
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
    `EXEC TimexAPI.SearchApprovedMissions ${MemberID}, N'${JSON.stringify(
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

    mission.Actions = JSON.parse(mission.Actions);
  });

  res.send(result);
});

module.exports = router;
