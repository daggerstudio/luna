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
  single: function (req, res, edit, cb) {

    var projectSlug = req.params.project;

    // Get project list
    var list = function(missions, project){

        List.projects(function(err, projectList){
            cb(missions, project, projectList);
        });
    };

    // Get project details
    var details = function (missions) {

      Project.findOne({
        slug: projectSlug
      }).exec(function (err, project) {

        // Error
        if (err) return res.negotiate(err);

        // Success
        if(edit) list(missions, project);
        else cb(missions, project);

      });
    };

    Mission.findOne({
      meta: "mission",
      slug: req.params.slug,
      projectSlug: req.params.project,
    }).exec(function (err, mission) {

      // Error
      if (err) return res.negotiate(err);

      // Success
      details(mission);
    });
  }
};
