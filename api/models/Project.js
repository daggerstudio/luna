/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  connection: "redis",
  schema: false,
  autoCreatedAt: true,
  attributes: {
    name: "string", // ex. Jane's Doe
    meta: {
      type: "string",
      defaultsTo: "project"
    }, // ex. project
    abbr: "string", // ex. JANE
    slug: "string" // ex. janes-doe
  }
};
