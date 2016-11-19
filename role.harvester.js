module.exports = {
  run: function(creep) {
    if (creep.carry.energy == 0) {
      creep.memory.working = false
    } else if (creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true
    }

    // if creep is supposed to transfer energy to a structure
    if (creep.memory.working) {
      // find closest spawn, extension or tower which is not full
      let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        // the second argument for findClosestByPath is an object which takes
        // a property called filter which can be a function
        // we use the arrow operator to define it
        filter: (s) => (s.structureType == STRUCTURE_SPAWN
          || s.structureType == STRUCTURE_EXTENSION
          || s.structureType == STRUCTURE_TOWER)
          && s.energy < s.energyCapacity
        });

      if (!structure) {
        structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => (
            s.type == STRUCTURE_CONTAINER
            && s.store.energy < s.storeCapacity
          )
        })
      }

      if (structure) {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }
    }
    else {
      let source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
}
