const userDuties = require("./../routers/official/org/user-duties");
const userMembersDuties = require("./../routers/official/org/user-members-duties");
//---
const userSecurityGuardRegedCards = require("./../routers/official/timex/user-security-guard-reged-cards");
const userApprovedVacations = require("./../routers/official/timex/user-approved-vacations");
const userApprovedMissions = require("./../routers/official/timex/user-approved-missions");
//---
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
const userOfficialCheckVacationCardexes = require("./../routers/official/timex/user-official-check-vacation-cardexes");
//---
const userMyReports = require("./../routers/official/timex/reports/user-my-reports");
//---
const userTransmissionRequests = require("./../routers/official/transmission/user-transmission-requests");
//---
const userTaskTags = require("./../routers/official/tasks/tags");
const userEmployeesTasks = require("./../routers/official/tasks/employees-tasks");
const userMyTasks = require("./../routers/official/tasks/my-tasks");
const userIntervalTasks = require("./../routers/official/tasks/interval-tasks");
//---
const userDismissals = require("../routers/official/processes/dismissals/user-dismissals");
const userOfficialCheckDismissals = require("./../routers/official/processes/dismissals/user-official-check-dismissals");
const userEduFunds = require("../routers/official/processes/edu-funds/user-edu-funds");
const userOfficialCheckEduFunds = require("./../routers/official/processes/edu-funds/user-official-check-edu-funds");
const userViolations = require("./../routers/official/processes/violations/user-violations");
const userOfficialCheckViolations = require("./../routers/official/processes/violations/user-official-check-violations");
const userDepartmentViolations = require("../routers/official/processes/violations/user-department-violations");
const userMyViolations = require("./../routers/official/processes/violations/user-my-violations");
const userCheckouts = require("../routers/official/processes/checkouts/user-checkouts");
const userDepartmentCheckouts = require("../routers/official/processes/checkouts/user-department-checkouts");
const userInformaticCheckouts = require("../routers/official/processes/checkouts/user-informatic-checkouts");
const userStoreCheckouts = require("../routers/official/processes/checkouts/user-store-checkouts");
const userFinancialCheckouts = require("../routers/official/processes/checkouts/user-financial-checkouts");
const userMgrTransfers = require("../routers/official/processes/mgr-transfers/user-mgr-transfers");
const userStoreMgrTransfers = require("../routers/official/processes/mgr-transfers/user-store-mgr-transfers");
//---

module.exports = function (app) {
  app.use("/api/official/org/user-duties", userDuties);
  app.use("/api/official/org/user-members-duties", userMembersDuties);
  //---
  app.use(
    "/api/official/timex/user-security-guard-reged-cards",
    userSecurityGuardRegedCards
  );
  app.use("/api/official/timex/user-approved-vacations", userApprovedVacations);
  app.use("/api/official/timex/user-approved-missions", userApprovedMissions);
  //---
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
  app.use(
    "/api/official/timex/user-official-check-vacation-cardexes",
    userOfficialCheckVacationCardexes
  );
  //---
  app.use("/api/official/timex/reports/user-my-reports", userMyReports);
  //---
  app.use(
    "/api/official/transmission/user-transmission-requests",
    userTransmissionRequests
  );
  //---
  app.use("/api/official/tasks/user-task-tags", userTaskTags);
  app.use("/api/official/tasks/user-employees-tasks", userEmployeesTasks);
  app.use("/api/official/tasks/user-my-tasks", userMyTasks);
  app.use("/api/official/tasks/user-interval-tasks", userIntervalTasks);
  //---
  app.use("/api/official/processes/user-dismissals", userDismissals);
  app.use(
    "/api/official/processes/user-official-check-dismissals",
    userOfficialCheckDismissals
  );
  app.use("/api/official/processes/user-edu-funds", userEduFunds);
  app.use(
    "/api/official/processes/user-official-check-edu-funds",
    userOfficialCheckEduFunds
  );
  app.use("/api/official/processes/user-violations", userViolations);
  app.use(
    "/api/official/processes/user-official-check-violations",
    userOfficialCheckViolations
  );
  app.use(
    "/api/official/processes/user-department-violations",
    userDepartmentViolations
  );
  app.use("/api/official/processes/user-my-violations", userMyViolations);
  app.use("/api/official/processes/user-checkouts", userCheckouts);
  app.use(
    "/api/official/processes/user-department-checkouts",
    userDepartmentCheckouts
  );
  app.use(
    "/api/official/processes/user-informatic-checkouts",
    userInformaticCheckouts
  );
  app.use("/api/official/processes/user-store-checkouts", userStoreCheckouts);
  app.use(
    "/api/official/processes/user-financial-checkouts",
    userFinancialCheckouts
  );
  app.use("/api/official/processes/user-mgr-transfers", userMgrTransfers);
  app.use(
    "/api/official/processes/user-store-mgr-transfers",
    userStoreMgrTransfers
  );
};
