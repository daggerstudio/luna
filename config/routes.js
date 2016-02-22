/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  // Generic
  //----------------------------------------------------------------------------

  // Homepage
  "/": {
    view: "homepage"
  },


  // PROJECTS
  //----------------------------------------------------------------------------

  // New Project
  "post /project/new/": {
    controller: "Project",
    action: "new",
    skipAssets: true
  },

  // Single Project Create
  "get /projects/create/": {
    controller: "Project",
    action: "create",
    skipAssets: true
  },

  // Single Project Edit
  "/projects/edit/:project": {
    controller: "Project",
    action: "edit",
    skipAssets: true
  },

  // Listing Project
  "/projects/": {
    controller: "Project",
    action: "listing",
    skipAssets: true
  },

  // Single Project View
  "/:project/": {
    controller: "Project",
    action: "view",
    skipAssets: true
  },

  // MISSIONS
  //----------------------------------------------------------------------------

  // New Mission
  "post /missions/new/": {
    controller: "Mission",
    action: "new",
    skipAssets: true
  },

  // Update Mission
  "post /missions/update/": {
    controller: "Mission",
    action: "update",
    skipAssets: true
  },

  // Single Task Create
  "get /:project/missions/create/": {
    controller: "Mission",
    action: "create",
    skipAssets: true
  },

  // Single Task Edit
  "get /:project/missions/:slug/edit/": {
    controller: "Mission",
    action: "edit",
    skipAssets: true
  },

  // Completed Missions
  "get /:project/missions/complete/": {
    controller: "Mission",
    action: "complete",
    skipAssets: true
  },

  // Single Task View
  "get /:project/missions/:slug/": {
    controller: "Mission",
    action: "view",
    skipAssets: true
  },

  // Listing Task
  "get /:project/missions/": {
    controller: "Mission",
    action: "listing",
    skipAssets: true
  }

};
