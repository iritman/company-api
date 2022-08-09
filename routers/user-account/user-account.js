const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { selectQuery } = require("../../startup/db");

router.get("/profile", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(`EXEC OrgAPI.GetMemberProfile ${MemberID}`);

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/change-password", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC OrgAPI.ChangePassword ${MemberID}, N'${JSON.stringify(req.body)}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
