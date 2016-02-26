/**
 * Info.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  connection: "mongo",
  schema: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    summary: {
      type: "string",
      defaultsTo: ""
    },
    summaryMD: {
      type: "string",
      defaultsTo: ""
    },
    description: {
      type: "string",
      defaultsTo: ""
    },
    descriptionMD: {
      type: "string",
      defaultsTo: ""
    },
    history: {
      type: "array"
    }
  }
};
