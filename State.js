import Building from "./building.js";
import Orc from "./Orc.js";
import unitTypes from "./unit-types.js";
import Unit from "./Unit.js";

export default function State(race) {
  this.race = race;
  this.plans = [];
  this.reset();
}

State._planId = 1;

State.prototype.reset = function () {
  this.tick = 0;
  this.gold = 0;
  this.lumber = 0;
  this.buildings = [];

  Building._id = 1;
  Unit._id = 1;

  this.buildings = this.race.buildings().reduce((buildings, building) => {
    for (let i = 0; i < building.startQty || false; i++) {
      buildings.push(new Building(building, this.tick, this.tick));
    }
    return buildings;
  }, []);

  this.units = this.race.units().reduce((units, unit) => {
    for (let i = 0; i < unit.startQty || false; i++) {
      units.push(new unitTypes[unit.type](unit, this.tick, this.tick));
    }
    return units;
  }, []);
};

State.prototype.atTick = function (tick) {
  this.reset();
  this.tick = tick;
  this.plans
    .sort((a, b) => a.start - b.start)
    .filter((p) => p.start <= tick)
    .map((p) => {
      switch (p.type) {
        case "spawn":
          const unit = this.buildings
            .find((b) => b._id === p.meta.buildingId)
            .trySpawn(p.meta.unit, p.start);
          this.units.push(unit);
          break;
        case "building":
          const building = this.units
            .find((u) => u._id === p.meta.unitId)
            .tryBuilding(p.meta.building, p.start);
          if (building) {
            this.buildings.push(building);
          }
          break;
        case "harvesting":
          const result = this.units
            .find((u) => u._id === p.meta.unitId)
            .tryHarvesting(p.start);
          break;
        case "mining":
          this.units.find((u) => u._id === p.meta.unitId).tryMining(p.start);
          break;
      }

      return p;
    })
    .forEach((p) => {
      if (p.meta.unitId) {
        const unit = this.units.find((u) => (u._id = p.meta.unitId));
        if (unit.currentAction && currentAction.state !== p.type) {
          p.duration = Math.max(0, this.tick - p.start - 1);
        }
      }
    });
  return this;
};

State.prototype.addPlan = function (plan) {
  plan._id = State._planId++;
  this.plans.push(plan);
};

State.prototype.removePlan = function (id) {
  const index = this.plans.findIndex((p) => (p._id = id));
  if (index >= 0) {
    this.plans.splice(index, 1);
    return true;
  }
  return false;
};

State.prototype.availableBuildings = function () {
  const allBuildings = this.race.buildings();

  return allBuildings.filter((b) => {
    for (const dependency of b.dependsOn) {
      if (!this.buildings.some((sb) => sb.id === dependency)) {
        return false;
      }
    }
    return true;
  });
};

State.prototype.availableUnits = function () {
  return this.buildings
    .filter((b) => b.completed <= this.tick)
    .flatMap((b) => b.units.map((bu) => this.race.units().find(u => bu = u.id)));
};

State.prototype.idleWorkers = function () {
  return this.units.filter(
    (u) => u instanceof unitTypes.Worker && u.isIdle(this.tick)
  );
};

State.prototype.harvestingWorkers = function () {
  return this.units.filter(
    (u) => u instanceof unitTypes.Worker && u.isHarvesting(this.tick)
  );
};

State.prototype.miningWorkers = function () {
  return this.units.filter(
    (u) => u instanceof unitTypes.Worker && u.isMining(this.tick)
  );
};

State.prototype.unitAssignedThisTick = function (unit) {
  const u = this.units.find((u) => u._id === unit._id);
  if (u) {
    let action = u.currentAction(this.tick);
    return action && action.start === this.tick;
  }
  return false;
};
