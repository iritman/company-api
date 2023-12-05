const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/search/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.GetProductRequestItemSearchParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.post("/search/members", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.SearchMemberByText ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/search/tafsil-accounts", auth, async (req, res) => {
  const { MemberID } = req.user;
  const { searchText } = req.body;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.SearchFrontSideAccountByText ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.SearchProductRequestItems ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  res.send(result);
});

router.get("/info/:itemID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Financial_StoreOprAPI.GetProductRequestItemInfoByID ${MemberID}, ${req.params.itemID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Items = JSON.parse(result.Items);

  res.send(result);
});

module.exports = router;
