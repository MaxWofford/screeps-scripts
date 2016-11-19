'use strict'
// From https://github.com/thPion/Screeps-Nooby-Guide

require('prototype.spawn')()

let roles = require('roles')

module.exports.loop = function() {
  // check for memory entries of dead creeps by iterating over Memory.creeps
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }

  // Each creep should fullfil it's role
  let fulfilledRoles = {}
  for(let name in Game.creeps) {
    let creep = Game.creeps[name]
    let role = creep.memory.role
    if (role) {
      roles[role][0].run(creep)
      fulfilledRoles[role] = (fulfilledRoles[role] + 1) || 1
    } else {
      console.log(`${name} doesn't have a role`)
    }
  }

  // Spawner behavior
  for(let name in Game.spawns) {
    let spawn = Game.spawns[name]
    if (spawn.energy == spawn.energyCapacity) {
      for (let role in roles) {
        if ((fulfilledRoles[role] || 0) < roles[role][1]) {
          let energy = spawn.energy
          let creep_name = spawn.createCustomCreep(energy, role)
        }
      }
    }
  }
}
