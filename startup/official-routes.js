const userDuties = require("./../routers/official/org/user-duties");
const userMembersDuties = require("./../routers/official/org/user-members-duties");
//---
const useSecurityGuardRegedCards = require("./../routers/official/timex/user-security-guard-reged-cards");
//---

module.exports = function (app) {
  app.use("/api/official/org/user-duties", userDuties);
  app.use("/api/official/org/user-members-duties", userMembersDuties);
  //---
  app.use(
    "/api/official/timex/user-security-guard-reged-cards",
    useSecurityGuardRegedCards
  );
};
