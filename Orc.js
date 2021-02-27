import Building from "./Building.js";
import Race from "./Race.js";
import ResourceList from "./ResourceList.js";
import Unit from "./Unit.js"

import buildings from "./data/orc/buildings.js";
import units from "./data/orc/units.js";

export default function Orc() {
  Race.call(this);
}

Orc.prototype = Object.create(Race.prototype);

Object.defineProperty(Orc.prototype, "constructor", {
  value: Orc,
  enumerable: false,
  writable: true,
});

const peonData = units.find((u) => u.id === "peon");
const greatHallData = buildings.find((b) => b.id === "greatHall");

Orc.label = "Orc";
Orc.id = "orc";
Orc.buildings = buildings;
Orc.units = units;
Orc.startingResources = new ResourceList({
  gold: 500,
  lumber: 150,
  supply: 11,
  units: [
    new Unit(peonData),
    new Unit(peonData),
    new Unit(peonData),
    new Unit(peonData),
    new Unit(peonData),
  ],
  buildings: [new Building(greatHallData)],
});
