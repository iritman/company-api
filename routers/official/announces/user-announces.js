const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

// router.get("/params", auth, async (req, res) => {
//   const { MemberID } = req.user;

//   let result = await selectQuery(
//     `EXEC AnnounceAPI.GetBankAccountsParams ${MemberID}`
//   );

//   result = result.recordset[0];

//   if (result.Error) return res.status(400).send(result);

//   result.Banks = JSON.parse(result.Banks);

//   res.send(result);
// });

router.get("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC AnnounceAPI.GetAllAnnounces ${MemberID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((announce) => {
    announce.Files = JSON.parse(announce.Files);
    announce.Contacts = JSON.parse(announce.Contacts);
  });

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC AnnounceAPI.SearchAnnounces ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((announce) => {
    announce.Files = JSON.parse(announce.Files);
    announce.Contacts = JSON.parse(announce.Contacts);
  });

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC AnnounceAPI.DeleteAnnounce ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
