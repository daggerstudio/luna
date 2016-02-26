//==============================================================================
// MISSION CONTROLLER
//==============================================================================


module.exports = {

  //-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  // Mission Listing (view)
  //-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  listing: function (req, res) {

    Missions.all(req, res, false, function (missions, project) {

      return res.view("mission/listing", {
        title: "Mission Listing",
        project: project,
        missions: missions
      });
    });

  },

  //-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  // Closed Mission Listing (view)
  //-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
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


  //============================================================================
  // Single Mission (view)
  //============================================================================
  view: function (req, res) {

    Missions.single(req, res, function (err, mission) {

      // Error
      //------------------------------------------------------------------------
      if (err) {
        sails.log.error(err); // Log to console
        if (req.wantsJSON) return res.serverError(); // Send response
      }

      // Success
      //------------------------------------------------------------------------
      List.projects(function (err, projects) { // Fetch projects

        // Error
        //----------------------------------------------------------------------
        if (err) {
          sails.log.error(err); // Log to console
          if (req.wantsJSON) return res.serverError(); // Send response
        }

        // Success
        //----------------------------------------------------------------------
        return res.view("mission/view", {
          mission: mission,
          project: {
            name: mission.project,
            slug: mission.projectSlug
          },
          priorities: List.priorities(),
          types: List.types(),
          projects: projects,
          users: List.users(),
          workflow: List.lanes()
        });

      });

    });

  },
  //-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  // Create New Mission (view)
  //-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  create: function (req, res) {
    var projects;

    List.projects(function (err, result) {

      // Error
      //------------------------------------------------------------------------
      if (err) {
        sails.log.error(err); // Log to console
        if (req.wantsJSON) return res.serverError(); // Send response
      }

      return res.view("mission/create", {
        title: "Mission Create",
        action: "/mission/new/",
        currentProject: req.params.project,
        projects: result,
        users: List.users(),
        types: List.types(),
        priorities: List.priorities(),
        workflow: List.lanes()
      });
    });
  },

  //============================================================================
  // Update Request (endpoint)
  //============================================================================
  update: function (req, res) {

    Missions.populate(req, res, true, function (err, updated) {

      // Error
      //------------------------------------------------------------------------
      if (err) {
        sails.log.error(err); // Log to console
        if (req.wantsJSON) return res.serverError(); // Send response
      }

      // Success
      //------------------------------------------------------------------------
      sails.log.info("Mission " + updated[0].name + " updated."); // Log to console
      if (req.wantsJSON) return res.ok(); // Send response

      // Redirect the user
      return res.redirect("/" + updated[0].projectSlug + "/missions/" + updated[0].slug + "/");
    });

  },
  //============================================================================
  // New (endpoint)
  //============================================================================
  new: function (req, res) {

    Missions.populate(req, res, false, function (err, created) {

      // Error
      //------------------------------------------------------------------------
      if (err) {
        sails.log.error(err); // Log to console
        if (req.wantsJSON) return res.serverError(); // Send response
      }

      // Success
      //------------------------------------------------------------------------
      sails.log.info("Mission " + created.name + " created."); // Log to console
      if (req.wantsJSON) return res.ok(); // Send response

      // Redirect the user
      return res.redirect("/" + created.projectSlug + "/missions/" + created.slug + "/");
    });
  },
  //============================================================================
  // Delete (endpoint)
  //============================================================================
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
