const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetDismissalParams ${MemberID}`
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
    `EXEC ProcessAPI.SearchDismissals ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((dismissal) => {
    dismissal.Reports = JSON.parse(dismissal.Reports);
    dismissal.Actions = JSON.parse(dismissal.Actions);
    dismissal.Files = JSON.parse(dismissal.Files);
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveDismissal ${MemberID}, N'${JSON.stringify(req.body)}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Reports = JSON.parse(result.Reports);
  result.Actions = JSON.parse(result.Actions);
  result.Files = JSON.parse(result.Files);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.DeleteDismissal ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

// router.post("/report", auth, async (req, res) => {
//   const { MemberID } = req.user;

//   let result = await selectQuery(
//     `EXEC ProcessAPI.SaveDismissalReport ${MemberID}, N'${JSON.stringify(
//       req.body
//     )}'`
//   );

//   result = result.recordset[0];

//   if (result.Error) return res.status(400).send(result);

//   //---

//   if (result.VehicleInfo.length > 0) {
//     result.VehicleInfo = JSON.parse(result.VehicleInfo);
//   }

//   result.ReportInfo = JSON.parse(result.ReportInfo);
//   result.Notes = JSON.parse(result.Notes);
//   result.Actions = JSON.parse(result.Actions);

//   //---

//   res.send(result);
// });

// router.delete("/report/:recordID", auth, async (req, res) => {
//   const { MemberID } = req.user;

//   let result = await selectQuery(
//     `EXEC ProcessAPI.DeleteDismissalReport ${MemberID}, ${req.params.recordID}`
//   );

//   result = result.recordset[0];

//   if (result.Error) return res.status(400).send(result);

//   if (result.VehicleInfo.length > 0) {
//     result.VehicleInfo = JSON.parse(result.VehicleInfo);
//   }

//   result.ReportInfo = JSON.parse(result.ReportInfo);
//   result.Notes = JSON.parse(result.Notes);
//   result.Actions = JSON.parse(result.Actions);

//   res.send(result);
// });

module.exports = router;
