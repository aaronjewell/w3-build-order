import buildings from "../data/orc/buildings.js"
import units from "../data/orc/units.js"
import ActionManager from "./ActionManager.js"
import Building from "./Building.js"
import BuildingManager from "./BuildingManager.js"
import Orc from "./Orc.js"
import ResourceList from "./ResourceList.js"
import ResourceManager from "./ResourceManager.js"
import Unit from "./Unit.js"

export default class BuildOrder {
  constructor(race) {
    this.race = race
    this.reset()
    this.buildingManager = new BuildingManager(this.race)
    this.resourceManager = new ResourceManager()
    this.actionManager = new ActionManager(this.race, this.resourceManager)
  }

  reset() {
    this.tick = 0
  }

  availableUnitsForBuilding(building) {
    const atTick = this.resourceManager.resourcesAt(this.tick)
    return this.buildingManager.availableUnits(building, atTick)
  }

  availableUpgradesForBuilding(building) {
    const atTick = this.resourceManager.resourcesAt(this.tick)
    return this.buildingManager.availableUpgrades(building, atTick)
  }

  train(unitData, building) {
    this.actionManager.train(this.tick, unitData, building)
  }

  build(buildingData, worker) {
    this.actionManager.build(this.tick, buildingData, worker)
  }

  upgrade(upgradeData, building) {
    this.actionManager.upgrade(this.tick, upgradeData, building)
  }

  assignToGold(worker) {
    this.actionManager.assignToGold(this.tick, worker)
  }

  assignToLumber(worker) {
    this.actionManager.assignToLumber(this.tick, worker)
  }

  removeAction(action) {
    this.actionManager.removeAction(action)
  }

  get units() {
    return this.resourceManager.resourcesAt(this.tick).units
  }

  get miningWorkers() {
    return this.resourceManager.resourcesAt(this.tick).miningWorkers
  }

  get harvestingWorkers() {
    return this.resourceManager.resourcesAt(this.tick).harvestingWorkers
  }

  get buildings() {
    return this.resourceManager.resourcesAt(this.tick).buildings
  }

  get upgrades() {
    return this.resourceManager.resourcesAt(this.tick).upgrades
  }

  get availableBuildings() {
    const resources = this.resourceManager.resourcesAt(this.tick)
    return this.buildingManager.availableBuildings(resources)
  }

  get availableUnits() {
    return this.buildings.flatMap(b => this.availableUnitsForBuilding(b))
  }

  get availableUpgrades() {
    const resources = this.resourceManager.resourcesAt(this.tick)
    return this.buildings.flatMap(b =>
      this.buildingManager.availableUpgrades(b, resources),
    )
  }

  get gold() {
    return this.resourceManager.resourcesAt(this.tick).gold
  }

  get lumber() {
    return this.resourceManager.resourcesAt(this.tick).lumber
  }

  get actions() {
    return this.actionManager.getActions()
  }

  get supply() {
    return this.resourceManager.resourcesAt(this.tick).supply
  }

  get totalSupply() {
    return this.actions.reduce((supply, action) => {
      if (
        action.type === "build" &&
        action.start + action.duration <= this.tick
      ) {
        return supply + action.meta.building.supply
      }
      return supply
    }, this.race.startingResources.value.supply)
  }

  get completedUnits() {
    const units = []
    let id = this.race.startingResources.value.units.length + 1
    this.actions.forEach(action => {
      if (
        action.type === "train" &&
        action.start + action.duration <= this.tick
      ) {
        units.push({ _id: id++, ...action.meta.unit })
      }
    })
    return units.concat(this.race.startingResources.value.units)
  }

  get completedBuildings() {
    const buildings = []
    let id = this.race.startingResources.value.buildings.length + 1
    this.actions.forEach(action => {
      if (
        action.type === "build" &&
        action.start + action.duration <= this.tick
      ) {
        buildings.push({ _id: id++, ...action.meta.building })
      }
    })
    return buildings.concat(this.race.startingResources.value.buildings)
  }
}
