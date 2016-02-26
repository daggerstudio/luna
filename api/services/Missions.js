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
    }).populate("info").exec(function (err, mission) {
      cb(err, mission);
    });
  },

  // Mission Populate
  //----------------------------------------------------------------------------
  populate: function (req, res, update, cb) {

    var b = req.body;
    var id = b.id;

    // Activity Object
    //--------------------------------------------------------------------------
    var Activity = function (comment, markdown) {
      this.comment = Mod.md(comment);
      if (markdown) this.commentMD = comment;
      this.createdAt = Mod.ts();
    }

    // Fetch existing mission data
    //--------------------------------------------------------------------------
    var fetch = function () {
      Mission.findOne({
        id: id
      }).populate("info").exec(function (err, mission) {

        if (err) sails.log.error(err);
        else action(mission);
      });
    }

    // Populate the mission with data
    //--------------------------------------------------------------------------
    var action = function (mission) {

      var data = mission || {};

      // If Creating
      if (!update) {
        data.info = {
          history: []
        };
        data.info.history.unshift(new Activity("Mission created.", false));
      }

      // Mision
      //------------------------------------------------------------------------
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
        data.epicSlug = Mod.slugify(b.epic);
      }

      if (b.type) data.type = b.type;
      if (b.priority) data.priority = b.priority;
      if (b.assigned) data.assigned = b.assigned;
      if (b.complete) data.assigned = b.assigned;


      // Workflow
      //------------------------------------------------------------------------
      if (b.workflow) {
        if (update && data.workflow != b.workflow) {
          data.info.history.unshift(new Activity("Mission moved to " + b.workflow + " lane.", true));
        }
        data.workflow = b.workflow;
      }


      // Info
      //--------------------------------------------------------------------------

      if (b.summaryMD) {
        data.info.summaryMD = b.summaryMD;
        data.info.summary = Mod.md(b.summaryMD);
      }

      if (b.descriptionMD) {
        data.info.descriptionMD = b.descriptionMD;
        data.info.description = Mod.md(b.descriptionMD);
      }

      if (b.commentMD) {
        data.info.history.unshift(new Activity(b.commentMD, true));
      }


      // Update
      //--------------------------------------------------------------------------
      if (update) {
        Mission.update({
          id: id
        }, data).exec(function createCB(err, updated) {
          cb(err, updated);
        });
      }

      // Create
      //--------------------------------------------------------------------------
      else {
        Mission.create(data).exec(function createCB(err, updated) {
          cb(err, updated);
        });
      }
    }

    if (update) {
      fetch();
    }
    else {
      action(false);
    }

  }


};
