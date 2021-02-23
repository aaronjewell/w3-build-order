import Building from "./Building.js";
import Unit from "./Unit.js";

const LONG_DURATION = 1_000_000;

export default function Worker(...args) {
  Unit.call(this, ...args);

  this.buildings = [];
}

Worker.prototype = Object.create(Unit.prototype);

Object.defineProperty(Worker.prototype, "constructor", {
  value: Worker,
  enumerable: false,
  writable: true,
});

Worker.prototype.tryBuilding = function (building, tick) {
  const result = this.tryAction("building", tick, building.buildTime);
  if (result) {
    return new Building(building, tick, tick + building.buildTime);
  }
  return result;
};

Worker.prototype.planBuilding = function (building, tick, valid = true) {
    return this.planAction("building", tick, building.buildTime, valid, {
      unitId: this._id, building
    });
};

Worker.prototype.isBuilding = function (tick) {
    return this.isTakingAction("building", tick);
}

Worker.prototype.tryHarvesting = function (tick) {
  return this.tryAction("harvesting", tick, LONG_DURATION);
};

Worker.prototype.planHarvesting = function (tick, valid = true) {
    return this.planAction("harvesting", tick, LONG_DURATION, valid, {
      unitId: this._id,
    });
};

Worker.prototype.isHarvesting = function (tick) {
    return this.isTakingAction("harvesting", tick);
};

Worker.prototype.tryMining = function (tick) {
  return this.tryAction("mining", tick, LONG_DURATION);
}

Worker.prototype.planMining = function (tick, valid = true) {
  return this.planAction("mining", tick, LONG_DURATION, valid, {
    unitId: this._id,
  });
};

Worker.prototype.isMining = function (tick) {
    return this.isTakingAction("mining", tick);
};