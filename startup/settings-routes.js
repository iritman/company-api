const provinces = require("../routers/settings/basic-info/provinces");
const cities = require("../routers/settings/basic-info/cities");
const eduLevels = require("../routers/settings/basic-info/edu-levels");
const eduFields = require("../routers/settings/basic-info/edu-fields");
const universities = require("../routers/settings/basic-info/universities");
const employmentTypes = require("../routers/settings/basic-info/employment-types");
const employmentStatuses = require("../routers/settings/basic-info/employment-statuses");
const workPlaces = require("../routers/settings/basic-info/work-places");
//------
const pageAccesses = require("../routers/settings/accesses/page-accesses");
//------
const roles = require("../routers/settings/org/roles");
const departments = require("../routers/settings/org/departments");
const companies = require("../routers/settings/org/companies");
const members = require("../routers/settings/org/members");
const employees = require("../routers/settings/org/employees");
const companyAgents = require("../routers/settings/org/company-agents");
const dutyLevels = require("../routers/settings/org/duty-levels");
const personalDuties = require("../routers/settings/org/personal-duties");
const roleDuties = require("../routers/settings/org/role-duties");
const bankAccounts = require("../routers/settings/org/bank-accounts");
const storeExperts = require("../routers/settings/org/store-experts");
const informaticExperts = require("../routers/settings/org/informatic-experts");
const financialExperts = require("../routers/settings/org/financial-experts");
const ceremonyExperts = require("../routers/settings/org/ceremony-experts");
//------
const securityGuards = require("../routers/settings/timex/security-guards");
const securityGuardRegedCards = require("../routers/settings/timex/security-guard-reged-cards");
const vacationTypes = require("../routers/settings/timex/vacation-types");
const missionTypes = require("../routers/settings/timex/mission-types");
const holidays = require("../routers/settings/timex/holidays");
const workHours = require("../routers/settings/timex/work-hours");
const workGroups = require("../routers/settings/timex/work-groups");
const workShifts = require("../routers/settings/timex/work-shifts");
const regedCards = require("../routers/settings/timex/reged-cards");
const officialExperts = require("../routers/settings/timex/official-experts");
const vacationRequests = require("../routers/settings/timex/vacation-requests");
const missionRequests = require("../routers/settings/timex/mission-requests");
const missionTargets = require("../routers/settings/timex/mission-targets");
const departmentExtraWorkCapacities = require("../routers/settings/timex/department-extra-work-capacities");
const extraWorkCommandSources = require("../routers/settings/timex/extra-work-command-sources");
const noAlternativeEmployees = require("../routers/settings/timex/no-alternative-employees");
const vacationCardexSettings = require("../routers/settings/timex/vacation-cardex-settings");
const vacationCardexes = require("../routers/settings/timex/vacation-cardexes");
//------
const vehicleTypes = require("../routers/settings/transmission/vehicle-types");
const vehicleBrands = require("../routers/settings/transmission/vehicle-brands");
const vehicleModels = require("../routers/settings/transmission/vehicle-models");
const vehicles = require("../routers/settings/transmission/vehicles");
//------
const clientTypes = require("../routers/settings/ceremony/client-types");
const sessionLocations = require("../routers/settings/ceremony/session-locations");
//------

module.exports = function (app) {
  app.use("/api/settings/basic-info/provinces", provinces);
  app.use("/api/settings/basic-info/cities", cities);
  app.use("/api/settings/basic-info/edu-levels", eduLevels);
  app.use("/api/settings/basic-info/edu-fields", eduFields);
  app.use("/api/settings/basic-info/universities", universities);
  app.use("/api/settings/basic-info/employment-types", employmentTypes);
  app.use("/api/settings/basic-info/employment-statuses", employmentStatuses);
  app.use("/api/settings/basic-info/work-places", workPlaces);
  //------
  app.use("/api/settings/accesses/page-accesses", pageAccesses);
  //------
  app.use("/api/settings/org/roles", roles);
  app.use("/api/settings/org/departments", departments);
  app.use("/api/settings/org/companies", companies);
  app.use("/api/settings/org/members", members);
  app.use("/api/settings/org/employees", employees);
  app.use("/api/settings/org/company-agents", companyAgents);
  app.use("/api/settings/org/duty-levels", dutyLevels);
  app.use("/api/settings/org/personal-duties", personalDuties);
  app.use("/api/settings/org/role-duties", roleDuties);
  app.use("/api/settings/org/bank-accounts", bankAccounts);
  app.use("/api/settings/org/store-experts", storeExperts);
  app.use("/api/settings/org/informatic-experts", informaticExperts);
  app.use("/api/settings/org/financial-experts", financialExperts);
  app.use("/api/settings/org/ceremony-experts", ceremonyExperts);
  //------
  app.use("/api/settings/timex/security-guards", securityGuards);
  app.use(
    "/api/settings/timex/security-guard-reged-cards",
    securityGuardRegedCards
  );
  app.use("/api/settings/timex/vacation-types", vacationTypes);
  app.use("/api/settings/timex/mission-types", missionTypes);
  app.use("/api/settings/timex/holidays", holidays);
  app.use("/api/settings/timex/work-hours", workHours);
  app.use("/api/settings/timex/work-groups", workGroups);
  app.use("/api/settings/timex/work-shifts", workShifts);
  app.use("/api/settings/timex/reged-cards", regedCards);
  app.use("/api/settings/timex/official-experts", officialExperts);
  app.use("/api/settings/timex/vacation-requests", vacationRequests);
  app.use("/api/settings/timex/mission-requests", missionRequests);
  app.use("/api/settings/timex/mission-targets", missionTargets);
  app.use(
    "/api/settings/timex/department-extra-work-capacities",
    departmentExtraWorkCapacities
  );
  app.use(
    "/api/settings/timex/extra-work-command-cources",
    extraWorkCommandSources
  );
  app.use(
    "/api/settings/timex/no-alternative-employees",
    noAlternativeEmployees
  );
  app.use(
    "/api/settings/timex/vacation-cardex-settings",
    vacationCardexSettings
  );
  app.use("/api/settings/timex/vacation-cardexes", vacationCardexes);
  //------
  app.use("/api/settings/transmission/vehicle-types", vehicleTypes);
  app.use("/api/settings/transmission/vehicle-brands", vehicleBrands);
  app.use("/api/settings/transmission/vehicle-models", vehicleModels);
  app.use("/api/settings/transmission/vehicles", vehicles);
  //------
  app.use("/api/settings/ceremony/client-types", clientTypes);
  app.use("/api/settings/ceremony/session-locations", sessionLocations);
};
