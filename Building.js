import unitTypes from "./unit-types.js";

export default function Building(
  { id, name, gold, lumber, buildTime, dependsOn, units },
  started,
  completed = null
) {
  this._id = Building._id++;
  this.id = id;
  this.name = name;
  this.gold = gold;
  this.lumber = lumber;
  this.buildTime = buildTime;
  this.dependsOn = dependsOn;
  this.units = units;

  this.started = started;
  this.completed = completed;

  this.spawns = [];
}

Building._id = 1;

Building.prototype.units = function() {
    return this.units.map(u => unitTypes[u.id]);
}

Building.prototype.doSpawn = function (unit, start) {
  // Check that we can spawn that unit
  if (!this.units.includes(unit.id)) {
    return false;
  }

  // Check if the building is available at that time.
  if (start < this.completed) {
    return false;
  }

  const spawn = new unitTypes[unit.type](unit, start, start + unit.buildTime);

  this.spawns.push(spawn);

  return spawn;

  return true;
};

Building.prototype.trySpawn = function (unit, start) {
  const result = this.doSpawn(unit, start);
  if (!result) {
    console.error("Building can't spawn");
    return false;
  }
  return result;
};

Building.prototype.planSpawn = function (unit, start, valid = true) {
  return { start, type: "spawn", valid, meta: { buildingId: this._id, unit } };
};

Building.prototype.isSpawning = function (tick) {
  for (const spawn of this.spawns) {
    if (tick > spawn.start && tick + unit.buildTime < spawn.completed) {
      return true;
    }
  }
  return false;
};

Building.prototype.spawnsAtTick = function (tick) {
  return this.spawns.filter((spawn) => spawn.started < tick);
};
