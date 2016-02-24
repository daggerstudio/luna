//==============================================================================
// Missions
//==============================================================================
module.exports = {

  // All Missions
  //----------------------------------------------------------------------------
  all: function (req, res, edit, cb) {

    var projectSlug = req.params.project;

    // Get Project
    var details = function (missions) {

      Project.findOne({
        slug: projectSlug
      }).exec(function (err, project) {

        // Error
        if (err) return res.negotiate(err);

        // Success
        cb(missions, project);
      });
    };

    // Get Missions
    List.missions(projectSlug, function (err, missions) {

      // Error
      if (err) return res.negotiate(err);

      // Success
      details(missions);
    });
  },

  // Single Mission
  //----------------------------------------------------------------------------
  single: function (req, res, cb) {

    var p = req.params;

    Mission.findOne({
      meta: "mission",
      slug: p.missionSlug,
      projectSlug: p.projectSlug,
    }).exec(function (err, mission) {
      cb(err, mission);
    });
  },

  // Mission Populate
  //----------------------------------------------------------------------------
  populate: function (req, res, update, cb) {

    var b = req.body; // Reference to req.body
    var id = b.id;

    var data = {};

    if (b.name) {
      data.name = b.name;
      data.slug = Mod.slugify(b.name);
    }

    if (b.project) {
      data.project = b.project;
      data.projectSlug = Mod.slugify(b.project);
    }

    if (b.epic) {
      data.epic = b.epic;
      data.epic = Mod.slugify(b.epic);
    }

    if (b.type) data.type = b.type;
    if (b.priority) data.priority = b.priority;
    if (b.workflow) data.workflow = b.workflow;
    if (b.assigned) data.assigned = b.assigned;
    if (b.complete) data.assigned = b.assigned;


    if (update) {
      Mission.update({
        id: id
      }, data).exec(function createCB(err, updated) {
        cb(err, updated);
      });
    }

    else {
      Mission.create(data).exec(function createCB(err, updated) {
        cb(err, updated);
      });
    }

  }


};
