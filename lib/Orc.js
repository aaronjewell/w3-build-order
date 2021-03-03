import Building from "./Building.js";
import Race from "./Race.js";
import ResourceList from "./ResourceList.js";
import Unit from "./Unit.js";

import buildings from "../data//orc/buildings.js";
import units from "../data//orc/units.js";

const peonData = units.find((u) => u.id === "peon");
const greatHallData = buildings.find((b) => b.id === "greatHall");

export default class Orc extends Race {
  static label = "Orc";
  
  static id = "orc";

  static buildings = buildings;

  static units = units;

  static startingResources = new ResourceList({
    gold: 500,
    lumber: 150,
    supply: 11,
    miningWorkers: 0,
    harvestingWorkers: 0,
    units: [
      new Unit(peonData),
      new Unit(peonData),
      new Unit(peonData),
      new Unit(peonData),
      new Unit(peonData),
    ],
    buildings: [new Building(greatHallData)],
  });
}
