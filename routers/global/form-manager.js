const express = require("express");
const auth = require("../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../startup/db");

router.get("/ui/:formID", auth, async (req, res) => {
  // const { MemberID } = req.user;

  let result = await selectQuery(`EXEC AppAPI.GetFormUI ${req.params.formID}`);

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.FormItems = JSON.parse(result.FormItems);
  result.FormItems.forEach((item) => {
    item.DataSource = JSON.parse(item.DataSource);

    if (item.DataSource.length > 0) {
      const first_row = item.DataSource[0];
      const data_source_key_field = Object.keys(first_row)[0];

      // Masalan agar 2 field <FromStoreID> va <ToStoreID> darim ke dar db
      // faghat sotune <StoreID> hast,
      // Ba in ravesh, field morede niaz be data source add mishavad
      if (data_source_key_field !== item.FieldName) {
        item.DataSource.forEach((ds_item) => {
          ds_item[item.FieldName] = ds_item[data_source_key_field];
        });
      }
    }
  });

  res.send(result);
});

module.exports = router;
