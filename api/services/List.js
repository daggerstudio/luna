//==============================================================================
// List
//==============================================================================
module.exports = {

  // List Projects (fetch)
  //----------------------------------------------------------------------------
  projects: function (cb) {
    Project.find({
      meta: "project"
    }).sort("name ASC").exec(function (err, project) {
      cb(err, project);
    });
  },

  // List Missions
  //----------------------------------------------------------------------------
  missions: function (projectSlug, cb) {
    Mission.find({
      meta: "mission",
      projectSlug: projectSlug
    }).sort("name ASC").exec(function (err, result) {
      cb(err, result);
    });
  },

  // List Types
  //----------------------------------------------------------------------------
  types: function () {
    return ["task", "bug", "story", "ideation", "research"];
  },

  // List Priorities
  //----------------------------------------------------------------------------
  priorities: function () {
    return ["backburner", "low", "medium", "high", "immediate"];
  },

  // List Limits
  //----------------------------------------------------------------------------
  limits: function () {
    return [10000, 12, 2, 4, 10];
  },

  // List Lanes
  //----------------------------------------------------------------------------
  lanes: function () {
    return ["backlog", "open", "in-progress", "sign-off", "done"];
  },

  // List Epics
  //----------------------------------------------------------------------------
  epics: function (string) {

  },

  // List Users
  //----------------------------------------------------------------------------
  users: function (string) {
    return ["Jon", "Tim"];
  }
};
