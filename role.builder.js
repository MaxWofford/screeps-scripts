var roleUpgrader = require('role.upgrader');

module.exports = {
  // a function to run the logic for this role
  run: function(creep) {
    if (creep.carry.energy == 0) {
      creep.memory.working = false;
    }
    else if (creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    if (creep.memory.working) {
      let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (constructionSite) {
        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite);
        }
      }
      else {
        roleUpgrader.run(creep);
      }
    }
    else {
      let source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
};
