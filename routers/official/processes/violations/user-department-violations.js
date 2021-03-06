const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetDepartmentViolationResponsesParams ${MemberID}`
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
    `EXEC ProcessAPI.SearchDepartmentViolationResponses ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((violation) => {
    // violation.Files = JSON.parse(violation.Files);
    violation.ResponseFiles = JSON.parse(violation.ResponseFiles);
    violation.Actions = JSON.parse(violation.Actions);
    if (violation.SeenInfo) {
      violation.SeenInfo = JSON.parse(violation.SeenInfo);
    }
  });

  res.send(result);
});

router.post("/response/seen/:violationID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.MakeSeenDepartmentViolationResponse ${MemberID}, ${req.params.violationID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.SeenInfo = JSON.parse(result.SeenInfo);

  res.send(result);
});

module.exports = router;
