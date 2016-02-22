//==============================================================================
// MISSION CONTROLLER
//==============================================================================
var markdown = require("markdown").markdown;


module.exports = {

  // Mission Listing
  //----------------------------------------------------------------------------
  listing: function (req, res) {

    Missions.all(req, res, false, function (missions, project) {

      return res.view("mission/listing", {
        title: "Mission Listing",
        project: project,
        missions: missions
      });
    });

  },

  // Closed Mission Listing
  //----------------------------------------------------------------------------
  complete: function (req, res) {

    var completedMissions = [];

    Missions.all(req, res, false, function (missions, project) {

      missions.forEach(function (mission) {

        if (mission.complete) completedMissions.push(mission);

      });

      return res.view("mission/listing", {
        title: "Mission Listing",
        project: project,
        missions: completedMissions
      });
    });

  },


  // Single Mission View
  //----------------------------------------------------------------------------
  view: function (req, res) {

    Missions.single(req, res, true, function (mission, project, projectList) {
      return res.view("mission/view", {
        title: "Mission View",
        action: "/mission/update/",
        types: List.types(),
        priorities: List.priorities(),
        users: List.users(),
        workflow: List.lanes(),
        projectList: projectList,
        project: project,
        mission: mission
      });
    });

  },

  // Create New Mission
  //----------------------------------------------------------------------------
  create: function (req, res) {
    var projects;

    List.projects(function (err, result) {

      if (err) console.log("Error");

      return res.view("mission/create", {
        title: "Mission Create",
        action: "/mission/new/",
        currentProject: req.params.project,
        projects: result,
        types: List.types(),
        priorities: List.priorities(),
        workflow: List.lanes()
      });
    });
  },


  // Update Request
  //----------------------------------------------------------------------------
  update: function (req, res) {

    var b = req.body; // Reference to req.body

    console.log(Mod.uid(b.name));

    // If the request want's JSON and does not supply absolute name
    if (req.wantsJSON && !b.absName) b.absName = b.name;

    Mission.update({
      name: b.absName // Absolute name (previous if changed)
    }, {
      name: b.name,
      meta: "mission",
      slug: Mod.slugify(b.name),
      complete: b.complete || false,
      project: b.project,
      projectSlug: Mod.slugify(b.project),
      epic: b.epic,
      type: b.type,
      priority: b.priority,
      workflow: b.workflow,
      assigned: b.assigned,
    }).exec(function createCB(err, updated) {

      // Error
      if (err) sails.log.error(err);

      // Success
      else {

        // Log success to the console
        sails.log.info("Mission " + updated[0].name + " updated.");

        // Send response
        if (req.wantsJSON) return res.ok();

        // Redirect the user
        return res.redirect("/" + updated[0].projectSlug + "/missions/" + updated[0].slug + "/");

      }
    });
  },

  // New
  //----------------------------------------------------------------------------
  new: function (req, res) {

    var b = req.body; // Reference to req.body

    Mission.create({
      name: b.name,
      meta: "mission",
      slug: Mod.slugify(b.name),
      project: b.project,
      projectSlug: Mod.slugify(b.project),
      epic: b.epic,
      type: b.type,
      desc: b.desc,
      priority: b.priority,
      workflow: b.workflow,
      assigned: b.assigned,
    }).exec(function createCB(err, created) {

      // Error
      if (err) sails.log.error(err);

      // Success
      else {
        // Log to the console and redirect the user
        sails.log.info("Mission " + created.name + " created.");
        return res.redirect("/" + created.projectSlug + "/missions/" + created.slug + "/");
      }
    });
  },

  delete: function (req, res) {

    var b = req.body; // Reference to req.body

    Mission.destroy({
      name: b.slug
    }).exec(function (err) {

      // Error
      if (err) return res.negotiate(err);

      // Success
      sails.log.info(b.name + " mission has be deleted.");
      return res.redirect("/" + b.projectSlug + "/");
    });
  }

};
