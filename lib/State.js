import ActionManager from "./ActionManager.js";
import Building from "./Building.js";
import BuildingManager from "./BuildingManager.js";
import Orc from "./Orc.js";
import ResourceList from "./ResourceList.js";
import ResourceManager from "./ResourceManager.js";
import Unit from "./Unit.js";

export default function State(race) {
  this.race = race;
  this.reset();
  this.buildingManager = new BuildingManager(this.race);
  this.resourceManager = new ResourceManager();
  this.actionManager = new ActionManager(this.race, this.resourceManager);
}

State.prototype.reset = function() {
  this.tick = 0;
};

State.prototype.availableUnitsForBuilding = function(building) {
  const atTick = this.resourceManager.resourcesAt(this.tick);
  return this.buildingManager.availableUnits(building, atTick);
};

State.prototype.train = function(unitData, building) {
  this.actionManager.train(this.tick, unitData, building);
};

State.prototype.build = function(buildingData, worker) {
  this.actionManager.build(this.tick, buildingData, worker);
};

State.prototype.assignToGold = function(worker) {
  this.actionManager.assignToGold(this.tick, worker);
};

State.prototype.assignToLumber = function(worker) {
  this.actionManager.assignToLumber(this.tick, worker);
};

State.prototype.removeAction = function(start, id) {
  this.actionManager.removeAction(start, id);
};

Object.defineProperty(State.prototype, "units", {
  get: function() {
    return this.resourceManager.resourcesAt(this.tick).units;
  },
});

Object.defineProperty(State.prototype, "buildings", {
  get: function() {
    return this.resourceManager.resourcesAt(this.tick).buildings;
  },
});

Object.defineProperty(State.prototype, "availableBuildings", {
  get: function() {
    const atTick = this.resourceManager.resourcesAt(this.tick);
    return this.buildingManager.availableBuildings(atTick);
  },
});

Object.defineProperty(State.prototype, "availableUnits", {
  get: function() {
    return this.buildings.flatMap((b) =>
      this.availableUnitsForBuilding(b)
    );
  },
});

Object.defineProperty(State.prototype, "gold", {
  get: function() {
    return this.resourceManager.resourcesAt(this.tick).gold;
  },
});

Object.defineProperty(State.prototype, "lumber", {
  get: function() {
    return this.resourceManager.resourcesAt(this.tick).lumber;
  },
});

Object.defineProperty(State.prototype, "actions", {
  get: function() {
    return this.actionManager.getActions();
  },
});

Object.defineProperty(State.prototype, "supply", {
  get: function() {
    return this.resourceManager.resourcesAt(this.tick).supply;
  },
});

Object.defineProperty(State.prototype, "totalSupply", {
  get: function() {
    return this.actions.reduce((supply, action) => {
      if (
        action.type === "build" &&
        action.start + action.duration <= this.tick
      ) {
        return supply + action.meta.building.supply;
      }
      return supply;
    }, this.race.startingResources.value.supply);
  },
});

Object.defineProperty(State.prototype, "completedBuildings", {
  get: function() {
    const buildingIds = [];
    this.actions.forEach((action) => {
      if (
        action.type === "build" &&
        action.start + action.duration <= this.tick
      ) {
        buildingIds.push(action.meta.building.id);
      }
    });
    return this.race.buildings.filter((b) => b.tier === 1 || buildingIds.includes(b.id));
  },
});
