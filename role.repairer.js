let roleBuilder = require('role.builder');
let roleHarvester = require('role.harvester');

module.exports = {
  run: function(creep) {
    if (creep.carry.energy == 0) {
      creep.memory.working = false;
    }
    else if (creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    // if creep is supposed to repair something
    if (creep.memory.working) {
      // find closest structure with less than max hits
      // Exclude walls because they have way too many max hits and would keep
      // our repairers busy forever. We have to find a solution for that later.
      var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        // the second argument for findClosestByPath is an object which takes
        // a property called filter which can be a function
        // we use the arrow operator to define it
        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
      })

      // if we find one
      if (structure) {
        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }
      else {
        roleBuilder.run(creep)
      }
    }
    else {
      roleHarvester.run(creep)
    }
  }
};
