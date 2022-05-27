const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");
const fs = require("fs");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetCheckoutParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/files/:checkoutID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.GetCheckoutFiles ${MemberID}, ${req.params.checkoutID}`
  );

  result = result.recordset;

  res.send(result);
});

// router.get("/announces", auth, async (req, res) => {
//   const { MemberID } = req.user;

//   let result = await selectQuery(
//     `EXEC ProcessAPI.GetAllCheckoutAnnounces ${MemberID}`
//   );

//   result = result.recordset;

//   if (result.length === 1 && result[0].Error)
//     return res.status(400).send(result[0]);

//   result.forEach((announce) => {
//     announce.Files = JSON.parse(announce.Files);
//     announce.SenderRequestFiles = JSON.parse(announce.SenderRequestFiles);
//   });

//   res.send(result);
// });

// router.post("/announce/seen/:announceID", auth, async (req, res) => {
//   const { MemberID } = req.user;

//   let result = await selectQuery(
//     `EXEC ProcessAPI.MakeSeenCheckoutAnnounce ${MemberID}, ${req.params.announceID}`
//   );

//   result = result.recordset[0];

//   if (result.Error) return res.status(400).send(result);

//   res.send(result);
// });

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SearchCheckouts ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((checkout) => {
    checkout.Reports = JSON.parse(checkout.Reports);
    checkout.Reports.forEach(
      (report) => (report.Files = JSON.parse(report.Files))
    );
    checkout.Actions = JSON.parse(checkout.Actions);
    checkout.Files = JSON.parse(checkout.Files);
    // checkout.ResponseFiles = JSON.parse(checkout.ResponseFiles);
    // if (checkout.AnnounceInfo) {
    //   checkout.AnnounceInfo = JSON.parse(checkout.AnnounceInfo);
    //   checkout.AnnounceInfo.Files = JSON.parse(checkout.AnnounceInfo.Files);
    // }
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveCheckout ${MemberID}, N'${JSON.stringify(req.body)}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Reports = JSON.parse(result.Reports);
  result.Reports.forEach((report) => (report.Files = JSON.parse(report.Files)));
  result.Actions = JSON.parse(result.Actions);
  result.Files = JSON.parse(result.Files);
  //   result.ResponseFiles = JSON.parse(result.ResponseFiles);
  //   if (result.AnnounceInfo) {
  //     result.AnnounceInfo = JSON.parse(result.AnnounceInfo);
  //     result.AnnounceInfo.Files = JSON.parse(result.AnnounceInfo.Files);
  //   }

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.DeleteCheckout ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  result.DeletedFiles = JSON.parse(result.DeletedFiles);

  const baseDir = `./uploaded-files/checkout-files`;
  let dir = "";

  result.DeletedFiles.forEach((f) => {
    dir = `${baseDir}/${f.FileName}`;

    if (fs.existsSync(dir)) {
      fs.unlinkSync(dir);
    }
  });

  res.send({ Message: result.Message });
});

router.post("/report", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.SaveCheckoutOfficialReport ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  //---

  result.Files = JSON.parse(result.Files);

  //---

  res.send(result);
});

router.delete("/report/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC ProcessAPI.DeleteCheckoutOfficialReport ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.DeletedFiles = JSON.parse(result.DeletedFiles);

  const baseDir = `./uploaded-files/checkout-report-files`;
  let dir = "";

  result.DeletedFiles.forEach((f) => {
    dir = `${baseDir}/${f.FileName}`;

    if (fs.existsSync(dir)) {
      fs.unlinkSync(dir);
    }
  });

  res.send({ Message: result.Message });
});

module.exports = router;
