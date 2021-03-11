import Building from "./Building"
import NeutralBuilding from "./NeutralBuilding"
import Race from "./Race"
import ResourceList from "./ResourceList"
import Unit from "./Unit"

import buildings from "../data/orc/buildings"
import items from "../data/orc/items"
import units from "../data/orc/units"
import upgrades from "../data/orc/upgrades"

const peonData = units.find(u => u.id === "peon")
const greatHallData = buildings.find(b => b.id === "greatHall")

export default class Orc extends Race {
  static label = "Orc"

  static id = "orc"

  static buildings = buildings

  static items = items

  static units = units

  static upgrades = upgrades

  static startingResources = new ResourceList({
    gold: 500,
    lumber: 150,
    supply: 11,
    miningWorkers: [],
    harvestingWorkers: [],
    upgrades: [],
    units: [
      new Unit(peonData),
      new Unit(peonData),
      new Unit(peonData),
      new Unit(peonData),
      new Unit(peonData),
    ],
    buildings: [new Building(greatHallData)],
    neutralBuildings: Orc.neutralBuildings.map(nb => new NeutralBuilding(nb)),
  })
}
