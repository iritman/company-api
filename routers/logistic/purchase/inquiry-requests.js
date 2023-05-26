const express = require("express");
const auth = require("../../../middlewares/auth");
const router = express.Router();
const { selectQuery } = require("../../../startup/db");

router.get("/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetInquiryRequestsParams ${MemberID}`
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
    `EXEC Logistic_PurchaseAPI.GetInquiryRequestSearchParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/item/params", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetInquiryRequestItemsParams ${MemberID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  for (const key in result) {
    result[key] = JSON.parse(result[key]);
  }

  res.send(result);
});

router.get("/search/purchases", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetRegedPurchaseRequestsForInquiry ${MemberID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  result.forEach((r) => (r.Items = JSON.parse(r.Items)));

  res.send(result);
});

router.get("/search/purchases/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetRegedPurchaseRequestByIDForInquiry ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Items = JSON.parse(result.Items);

  res.send(result);
});

router.get("/search/services", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetRegedServiceRequestsForInquiry ${MemberID}`
  );

  result = result.recordset;

  if (result.Error) return res.status(400).send(result);

  result.forEach((r) => (r.Items = JSON.parse(r.Items)));

  res.send(result);
});

router.get("/search/services/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.GetRegedServiceRequestByIDForInquiry ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  result.Items = JSON.parse(result.Items);

  res.send(result);
});

router.post("/search", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SearchInquiryRequests ${MemberID}, N'${JSON.stringify(
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
    `EXEC Logistic_PurchaseAPI.SaveInquiryRequest ${MemberID}, N'${JSON.stringify(
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
    `EXEC Logistic_PurchaseAPI.SaveInquiryRequestItem ${MemberID}, N'${JSON.stringify(
      req.body
    )}'`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/supplier", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.SaveInquiryRequestSupplier ${MemberID}, N'${JSON.stringify(
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
    `EXEC Logistic_PurchaseAPI.RejectInquiryRequest ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/approve/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.ApproveInquiryRequest ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.post("/undo-approve/:requestID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.UndoApproveInquiryRequest ${MemberID}, ${req.params.requestID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.DeleteInquiryRequest ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/item/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.DeleteInquiryRequestItem ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

router.delete("/supplier/:recordID", auth, async (req, res) => {
  const { MemberID } = req.user;

  let result = await selectQuery(
    `EXEC Logistic_PurchaseAPI.DeleteInquiryRequestSupplier ${MemberID}, ${req.params.recordID}`
  );

  result = result.recordset[0];

  if (result.Error) return res.status(400).send(result);

  res.send(result);
});

module.exports = router;
