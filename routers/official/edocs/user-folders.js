const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(`EXEC EDocsAPI.GetFoldersParams ${MemberID}`);

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(`EXEC EDocsAPI.GetAllFolders ${MemberID}`);

  result = result.recordset;

  result.forEach((folder_group) => {
    folder_group.Folders = JSON.parse(folder_group.Folders);
    folder_group.Folders.forEach(
      (folder) => (folder.SubFolders = JSON.parse(folder.SubFolders))
    );
  });

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { searchText } = req.body;
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC EDocsAPI.SearchFolders ${MemberID}, N'${searchText}'`
  );

  result = result.recordset;

  result.forEach((folder_group) => {
    folder_group.Folders = JSON.parse(folder_group.Folders);
    folder_group.Folders.forEach(
      (folder) => (folder.SubFolders = JSON.parse(folder.SubFolders))
    );
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC EDocsAPI.SaveFolder ${MemberID}, N'${JSON.stringify(req.body)}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.SubFolders = JSON.parse(result.SubFolders);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC EDocsAPI.DeleteFolder ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
