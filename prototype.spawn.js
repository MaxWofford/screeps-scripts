module.exports = function() {
  StructureSpawn.prototype.createCustomCreep =
  function(energy, roleName) {
    let numberOfParts = Math.floor(energy / 200);
    let body = []
    switch(roleName) {
      case 'harvester':
        if (energy <= 300) {
          body =  [MOVE, WORK, WORK, CARRY]
        } else {
          body = [MOVE, WORK, WORK, WORK, CARRY]
        }
        break
      case 'carrier':
        body = [MOVE, MOVE, CARRY, CARRY]
        break
      default:
        for (let i = 0; i < numberOfParts; i++) {
          body.push(WORK)
        }
        for (let i = 0; i < numberOfParts; i++) {
          body.push(CARRY)
        }
        for (let i = 0; i < numberOfParts; i++) {
          body.push(MOVE)
        }
        break
    }

    // create creep with the created body and the given role
    let creep = this.createCreep(body, undefined, { role: roleName, working: false })

    if (creep == ERR_NOT_ENOUGH_ENERGY) {
      console.log(body)
      console.log(`Not enough energy to spawn ${roleName}`)
    } else {
      console.log(`Just spawned ${creep}, who is a ${roleName}`)
    }
    return creep
  }
}
