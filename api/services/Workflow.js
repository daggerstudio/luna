//==============================================================================
// Workflow
//==============================================================================
module.exports = {

  manifest: function (missions, cb) {

    var manifest = [];
    var lanes = List.lanes();
    var limits = List.limits();

    lanes.forEach(function (lane, i) {

        var obj = {};
        obj.name = lane;
        obj.limit = limits[i];
        obj.missions = [];

        manifest.push(obj);
    });

    missions.forEach(function (mission) {

      manifest.forEach(function (item, i) {
        if (mission.workflow == item.name) {
          manifest[i].missions.push(mission);
        }
      });
    });


    cb(manifest);
  }

};
