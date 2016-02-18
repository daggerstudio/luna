/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  connection: "redis",
  schema: false,
  autoCreatedAt: true,
  attributes: {
    name: "string",
    class: "string",
    slug: "string",
    project: "string",
    projectSlug: "string",
    epic: "string",
    type:{
        type:"string",
        enum: List.types(),
        defaultsTo: "task"
    },
    desc: "string",
    priority: {
        type: "string",
        enum: List.priorities(),
        defaultsTo: "medium"
    },
    workflow: {
        type: "string",
        enum: List.lanes(),
        defaultsTo: "open"
    },
    assigned: "string",
  }
};