const userDuties = require("./../routers/official/org/user-duties");
const userMembersDuties = require("./../routers/official/org/user-members-duties");
//---
const userSecurityGuardRegedCards = require("./../routers/official/timex/user-security-guard-reged-cards");
const userMyRegedCards = require("./../routers/official/timex/user-my-reged-cards");
const userMyWorkShifts = require("./../routers/official/timex/user-my-work-shifts");
const userMyVacations = require("./../routers/official/timex/user-my-vacations");
const userMyMissions = require("./../routers/official/timex/user-my-missions");
const userVacationReplaceWorkRequests = require("../routers/official/timex/user-vacation-replace-work-requests");
const userMissionReplaceWorkRequests = require("../routers/official/timex/user-mission-replace-work-requests");
//---
const userMembersRegedCards = require("./../routers/official/timex/user-members-reged-cards");
const userMembersWorkShifts = require("./../routers/official/timex/user-members-work-shifts");
const userMembersVacationsCheckManager = require("./../routers/official/timex/user-members-vacations-cehck-manager");
const userMembersVacationsCheckOfficial = require("./../routers/official/timex/user-members-vacations-check-official");
const userMembersVacations = require("./../routers/official/timex/user-members-vacations");
const userMembersMissionsCheckManager = require("./../routers/official/timex/user-members-missions-cehck-manager");
const userMembersMissionsCheckOfficial = require("./../routers/official/timex/user-members-missions-check-official");
const userMembersMissions = require("./../routers/official/timex/user-members-missions");
const userMembersExtraWorkRequests = require("./../routers/official/timex/user-members-extra-work-requests");
const userOfficialCheckExtraWorkRequests = require("./../routers/official/timex/user-official-check-extra-work-requests");
const userOfficialCheckRegedCards = require("./../routers/official/timex/user-official-check-reged-cards");
const userOfficialCheckNoAlternativeEmployees = require("./../routers/official/timex/user-official-check-no-alternative-employees");
const userOfficialCheckMembersVacations = require("./../routers/official/timex/user-official-check-members-vacations");
const userOfficialCheckMembersMissions = require("./../routers/official/timex/user-official-check-members-missions");
//---
const userTransmissionRequests = require("./../routers/official/transmission/user-transmission-requests");
//---
const userTaskTags = require("./../routers/official/tasks/tags");
const userIntervalTasks = require("./../routers/official/tasks/interval-tasks");
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
  app.use("/api/official/timex/user-my-vacations", userMyVacations);
  app.use("/api/official/timex/user-my-missions", userMyMissions);
  app.use(
    "/api/official/timex/user-vacation-replace-work-requests",
    userVacationReplaceWorkRequests
  );
  app.use(
    "/api/official/timex/user-mission-replace-work-requests",
    userMissionReplaceWorkRequests
  );
  //---
  app.use(
    "/api/official/timex/user-members-reged-cards",
    userMembersRegedCards
  );
  app.use(
    "/api/official/timex/user-members-work-shifts",
    userMembersWorkShifts
  );
  app.use(
    "/api/official/timex/user-members-new-vacations-check-manager",
    userMembersVacationsCheckManager
  );
  app.use(
    "/api/official/timex/user-members-new-vacations-check-official",
    userMembersVacationsCheckOfficial
  );
  app.use("/api/official/timex/user-members-vacations", userMembersVacations);
  app.use(
    "/api/official/timex/user-members-new-missions-check-manager",
    userMembersMissionsCheckManager
  );
  app.use(
    "/api/official/timex/user-members-new-missions-check-official",
    userMembersMissionsCheckOfficial
  );
  app.use("/api/official/timex/user-members-missions", userMembersMissions);
  app.use(
    "/api/official/timex/user-members-extra-work-requests",
    userMembersExtraWorkRequests
  );
  app.use(
    "/api/official/timex/user-official-check-extra-work-requests",
    userOfficialCheckExtraWorkRequests
  );
  app.use(
    "/api/official/timex/user-official-check-reged-cards",
    userOfficialCheckRegedCards
  );
  app.use(
    "/api/official/timex/user-official-check-no-alternative-employees",
    userOfficialCheckNoAlternativeEmployees
  );
  app.use(
    "/api/official/timex/user-official-check-members-vacations",
    userOfficialCheckMembersVacations
  );
  app.use(
    "/api/official/timex/user-official-check-members-missions",
    userOfficialCheckMembersMissions
  );
  //---
  app.use(
    "/api/official/transmission/user-transmission-requests",
    userTransmissionRequests
  );
  //---
  app.use("/api/official/tasks/user-task-tags", userTaskTags);
  app.use("/api/official/tasks/user-interval-tasks", userIntervalTasks);
};
