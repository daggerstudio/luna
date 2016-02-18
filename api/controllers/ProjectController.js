//==============================================================================
// PROJECT CONTROLLER
//==============================================================================

module.exports = {

  // Listing
  //----------------------------------------------------------------------------
  listing: function (req, res) {

    Project.find({
      meta: "project"
    }).exec(function (err, results) {
      if (err) {
        return res.negotiate(err);
      }
      return res.view("project/listing", {
        results: results
      });
    });

  },

  // View
  //----------------------------------------------------------------------------
  view: function (req, res) {

    var render = function (missions, project, manifest) {

      return res.view("project/view", {
        title: "Project View",
        project: project,
        missions: missions,
        manifest: manifest
      });

    }

    Missions.all(req, res, false, function (missions, project) {

      Workflow.manifest(missions, function (manifest) {

          render(missions, project, manifest);
      });
    });

  },

  // Edit
  //----------------------------------------------------------------------------
  edit: function (req, res) {
    return res.view("project/edit", {
      title: "Project Edit"
    });
  },

  // Create
  //----------------------------------------------------------------------------
  create: function (req, res) {
    return res.view("project/create", {
      title: "New Project"
    });
  },

  // New
  //----------------------------------------------------------------------------
  new: function (req, res) {

    var b = req.body;

    Project.create({
      name: b.name,
      meta: "project",
      abbr: b.abbr,
      slug: Mod.slugify(b.name),
    }).exec(function createCB(err, created) {

      console.log("Project " + created.name + " (" + created.abbr + ").");

      return res.redirect("/" + created.slug + "/");
    });
  }
};
