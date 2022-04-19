const express = require("express");
const auth = require("../../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../../startup/db");

router.post("/my/in-out-cards", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC TimexAPI.ReportMyInOutCards ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

module.exports = router;
