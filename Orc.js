import Race from "./Race.js";

import buildings from "./data/orc/buildings.js";
import units from "./data/orc/units.js";

export default function Orc() {
    Race.call(this)
}

Orc.prototype = Object.create(Race.prototype);

Object.defineProperty(Orc.prototype, "constructor", {
  value: Orc,
  enumerable: false,
  writable: true,
});

Orc.buildings = buildings;
Orc.units = units;