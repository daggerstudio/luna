//==============================================================================
// List
//==============================================================================
module.exports = {

  projects: function (cb) {

    Project.find({
      meta: "project"
    }).sort("name ASC").exec(function (err, result) {

      cb(err, result);
    });
  },

  types: function () {
    return ["task", "bug", "story", "ideation", "research"];
  },

  priorities: function () {
    return ["backburner", "low", "medium", "high", "immediate"];
  },

  limits: function () {
    return [10000, 12, 2, 4, 10];
  },

  lanes: function () {

    return ["backlog","open", "in-progress", "sign-off", "done"];
  },

  missions: function (projectSlug, cb) {
    Mission.find({
      meta: "mission",
      projectSlug: projectSlug
    }).sort("name ASC").exec(function (err, result) {
      cb(err, result);
    });
  },

  epics: function (string) {

  },

  users: function (string) {
    return ["Jon", "Tim"];
  },
};
