const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC AnnounceAPI.GetAllMyAnnounces ${MemberID}`
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

router.get("/new", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC AnnounceAPI.GetNewAnnounces ${MemberID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((announce) => {
    announce.Files = JSON.parse(announce.Files);
  });

  res.send(result);
});

router.get("/archive", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC AnnounceAPI.GetArchivedAnnounces ${MemberID}`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((announce) => {
    announce.Files = JSON.parse(announce.Files);
  });

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { searchText } = req.body;
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC AnnounceAPI.SearchMyAnnounces ${MemberID}, N'${searchText}'`
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

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC AnnounceAPI.SaveMyAnnounce ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Files = JSON.parse(result.Files);
  result.Contacts = JSON.parse(result.Contacts);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC AnnounceAPI.DeleteMyAnnounce ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
