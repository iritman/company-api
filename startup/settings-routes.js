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
//------
const securityGuards = require("../routers/settings/timex/security-guards");
const vacationTypes = require("../routers/settings/timex/vacation-types");
const missionTypes = require("../routers/settings/timex/mission-types");
const holidays = require("../routers/settings/timex/holidays");
const workShifts = require("../routers/settings/timex/work-shifts");
const groupShifts = require("../routers/settings/timex/group-shifts");
const employeeShifts = require("../routers/settings/timex/employee-shifts");
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
  app.use("/api/settings/timex/security-guards", securityGuards);
  app.use("/api/settings/timex/vacation-types", vacationTypes);
  app.use("/api/settings/timex/mission-types", missionTypes);
  app.use("/api/settings/timex/holidays", holidays);
  app.use("/api/settings/timex/work-shifts", workShifts);
  app.use("/api/settings/timex/group-shifts", groupShifts);
  app.use("/api/settings/timex/employee-shifts", employeeShifts);
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
};
