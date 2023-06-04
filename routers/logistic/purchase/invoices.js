const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");
const { slashDate } = require("../../../tools/utils");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetInvoicesParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/search/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetInvoiceSearchParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

// router.get("/item/params", auth, async (req, res) => {
//   const { MemberID } = req.user;

//   let result = await selectQuery(
//     `EXEC Logistic_PurchaseAPI.GetInvoiceItemsParams ${MemberID}`
//   );

//   result = result.recordset[0];

//   if (result.Error) return res.status(400).send(result);

//   for (const key in result) {
//     result[key] = JSON.parse(result[key]);
//   }

//   res.send(result);
// });

const formatItem = (item) => {
  const {
    RequestDate,
    ItemCode,
    ItemTitle,
    MeasureUnitTitle,
    PurchaseAgentID,
    AgentFirstName,
    AgentLastName,
  } = item.ItemInfo;

  item.RequestDate = RequestDate;
  item.ItemCode = ItemCode;
  item.ItemTitle = ItemTitle;
  item.MeasureUnitTitle = MeasureUnitTitle;
  item.PurchaseAgentID = PurchaseAgentID;
  item.AgentFirstName = AgentFirstName;
  item.AgentLastName = AgentLastName;

  delete item.ItemInfo;

  return item;
};

router.get("/search/inquiry/items/:supplierID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetRegedInquiryRequestItemsForInvoice ${MemberID}, ${req.params.supplierID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  result.forEach((r) => {
    r.ItemInfo = JSON.parse(r.ItemInfo);
    r = formatItem(r);

    r.ItemInfo = `${r.ItemCode} - ${r.ItemTitle} - ${slashDate(
      r.InquiryRequestDate
    )}`;
  });

  res.send(result);
});

router.get("/search/inquiry/item/:itemID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetRegedInquiryRequestItemByIDForInvoice ${MemberID}, ${req.params.itemID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.ItemInfo = JSON.parse(result.ItemInfo);

  result = formatItem(result);

  result.ItemInfo = `${result.ItemCode} - ${result.ItemTitle} - ${slashDate(
    result.InquiryRequestDate
  )}`;

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SearchInvoices ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset;

  if (result.length === 1 && result[0].Error)
    return res.status(400).send(result[0]);

  result.forEach((request) => {
    request.Items = JSON.parse(request.Items);

    request.Items.forEach((i) => {
      i.RefItemInfo = JSON.parse(i.RefItemInfo);

      const {
        AgentFirstName,
        AgentLastName,
        NeedDate,
        InquiryDeadline,
        MeasureUnitTitle,
        SupplierTitle,
        ProductCode,
        ProductTitle,
        ServiceID,
        ServiceTitle,
      } = i.RefItemInfo;

      i.AgentFirstName = AgentFirstName;
      i.AgentLastName = AgentLastName;
      i.NeedDate = NeedDate;
      i.InquiryDeadline = InquiryDeadline;
      i.MeasureUnitTitle = MeasureUnitTitle;
      i.SupplierTitle = SupplierTitle;

      if (ProductCode) {
        i.ProductCode = ProductCode;
        i.ProductTitle = ProductTitle;
      }

      if (ServiceID) {
        i.ServiceID = ServiceID;
        i.ServiceTitle = ServiceTitle;
      }

      delete i.RefItemInfo;
    });
  });

  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SaveInvoice ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Items = JSON.parse(result.Items);

  res.send(result);
});

router.post("/item", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SaveInvoiceItem ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/reject/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.RejectInvoice ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/approve/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.ApproveInvoice ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/undo-approve/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.UndoApproveInvoice ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.DeleteInvoice ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/item/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.DeleteInvoiceItem ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
