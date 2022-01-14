const userDuties = require("./../routers/official/org/user-duties");
const userMembersDuties = require("./../routers/official/org/user-members-duties");
//---
const userSecurityGuardRegedCards = require("./../routers/official/timex/user-security-guard-reged-cards");
const userMyRegedCards = require("./../routers/official/timex/user-my-reged-cards");
const userMyWorkShifts = require("./../routers/official/timex/user-my-work-shifts");
//---
const userMembersRegedCards = require("./../routers/official/timex/user-members-reged-cards");
const userMembersWorkShifts = require("./../routers/official/timex/user-members-work-shifts");
//---

module.exports = function (app) {
  app.use("/api/official/org/user-duties", userDuties);
  app.use("/api/official/org/user-members-duties", userMembersDuties);
  //---
  app.use(
    "/api/official/timex/user-security-guard-reged-cards",
    userSecurityGuardRegedCards
  );
  app.use("/api/official/timex/user-my-reged-cards", userMyRegedCards);
  app.use("/api/official/timex/user-my-work-shifts", userMyWorkShifts);
  //---
  app.use(
    "/api/official/timex/user-members-reged-cards",
    userMembersRegedCards
  );
  app.use(
    "/api/official/timex/user-members-work-shifts",
    userMembersWorkShifts
  );
};
