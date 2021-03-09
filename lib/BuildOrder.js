import buildings from "../data/orc/buildings.js"
import units from "../data/orc/units.js"
import ActionManager from "./ActionManager.js"
import Building from "./Building.js"
import BuildingManager from "./BuildingManager.js"
import Orc from "./Orc.js"
import ResourceList from "./ResourceList.js"
import ResourceManager from "./ResourceManager.js"
import Unit from "./Unit.js"

/**
 * Warcraft 3 build order tool for a given race
 */
export default class BuildOrder {
  /**
   * Create a build order.
   * @param {Race} race - The race that should be used for this build order.
   */
  constructor(race) {
    this.race = race
    this.reset()
    this.buildingManager = new BuildingManager(this.race)
    this.resourceManager = new ResourceManager()
    this.actionManager = new ActionManager(this.race, this.resourceManager)
  }

  /**
   * Reset the build order back to the starting tick of 0.
   */
  reset() {
    this.tick = 0
  }

  /**
   * Retrieve all actions that can possibly be taken at a building, without considering resources.
   * @param {Building} building - The building to get actions for
   * @returns {Object[]} Actions that can be taken at a building, such as buying items, researching upgrades, or training units.
   */
  allBuildingActions(building) {
    return [
      ...this.buildingManager.allItems(building),
      ...this.buildingManager.allUpgrades(building),
      ...this.buildingManager.allUnits(building),
    ]
  }

  /**
   * The buildings that can be constructed with the current resources.
   * @returns {Object[]} The buildings that can be constructed.
   */
  availableBuildings() {
    const resources = this.resourceManager.resourcesAt(this.tick)
    return this.buildingManager.availableBuildings(resources)
  }

  /**
   * Items that can be purchased for the building with the current resources.
   * @param {Building} building - The building where items will be purchased.
   * @returns {Object[]} Data for items that can be purchased.
   */
  availableItemsForBuilding(building) {
    const atTick = this.resourceManager.resourcesAt(this.tick)
    return this.buildingManager.availableItems(building, this.tick, atTick)
  }

  /**
   * Units that can be trained for the building with the current resources.
   * @param {Building} building - The building where units can be trained.
   * @returns {Object[]} Data for units that can be trained.
   */
  availableUnitsForBuilding(building) {
    const atTick = this.resourceManager.resourcesAt(this.tick)
    return this.buildingManager.availableUnits(building, this.tick, atTick)
  }

  /**
   * Upgrades that can be researched for the building with the current resources.
   * @param {Building} building - The building where upgrades can be researched.
   * @returns {Object[]} Data for upgrades that can be researched.
   */
  availableUpgradesForBuilding(building) {
    const atTick = this.resourceManager.resourcesAt(this.tick)
    return this.buildingManager.availableUpgrades(building, atTick)
  }

  /**
   * Queue a building action using the worker.
   * @param {Object} buildingData - The building to be constructed.
   * @param {Unit} worker - The builder unit to assign to the construction
   */
  build(buildingData, worker) {
    this.actionManager.build(this.tick, buildingData, worker)
  }

  /**
   * Queue a buy action at the building
   * @param {Object} itemData - The item to purchase
   * @param {Building} building - The building where the item is bought from
   */
  buy(itemData, building) {
    this.actionManager.buy(this.tick, itemData, building)
  }

  /**
   * Queue a train action at the building.
   * @param {Object} unitData - The unit to train.
   * @param {Building} building - The building where the unit will be trained.
   */
  train(unitData, building) {
    this.actionManager.train(this.tick, unitData, building)
  }

  /**
   * Queue an upgrade action at the building.
   * @param {Object} upgradeData - The upgrade to research.
   * @param {Building} building - The building where the upgrade will be researched.
   */
  upgrade(upgradeData, building) {
    this.actionManager.upgrade(this.tick, upgradeData, building)
  }

  /**
   * Assign a worker to mine gold.
   * @param {Unit} worker - The worker to assign to mining
   */
  assignToGold(worker) {
    this.actionManager.assignToGold(this.tick, worker)
  }

  /**
   * Assign a worker to harvest lumber.
   * @param {Unit} worker - The worker to assign to harvesting.
   */
  assignToLumber(worker) {
    this.actionManager.assignToLumber(this.tick, worker)
  }

  /**
   * Remove an action from the queue.
   * @param {Action} action - The action to remove.
   */
  removeAction(action) {
    this.actionManager.removeAction(action)
  }

  /**
   * @type {Building[]} - Buildings that are available for actions at the current tick.
   */
  get buildings() {
    return this.resourceManager.resourcesAt(this.tick).buildings
  }

  /**
   * type {NeutralBuilding[]} - Non-race buildings that are available for actions at the current tick.
   */
  get neutralBuildings() {
    return this.resourceManager.resourcesAt(this.tick).neutralBuildings
  }

  /**
   * Number of mining workers at the current tick.
   * @type {Number}
   */
  get miningWorkers() {
    return this.resourceManager.resourcesAt(this.tick).miningWorkers
  }

  /**
   * Number of harvesting workers at the current tick.
   * @type {Number}
   */
  get harvestingWorkers() {
    return this.resourceManager.resourcesAt(this.tick).harvestingWorkers
  }

  /**
   * Units at the current tick that are available for actions.
   * @type {Unit[]}
   */
  get units() {
    return this.resourceManager.resourcesAt(this.tick).units
  }

  /**
   * All buildings for the current race.
   * @type {Object[]}
   */
  get allBuildings() {
    return this.buildingManager.allBuildings()
  }

  /**
   * Amount of gold available at the current tick.
   * @type {Number}
   */
  get gold() {
    return this.resourceManager.resourcesAt(this.tick).gold
  }

  /**
   * Amount of lumber at the current tick.
   * @type {Number}
   */
  get lumber() {
    return this.resourceManager.resourcesAt(this.tick).lumber
  }

  /**
   * The list of queued actions.
   * @type {Action[]}
   */
  get actions() {
    return this.actionManager.getActions()
  }

  /**
   * The amount of produced supply remaining at the current tick.
   * @type {Number}
   */
  get supply() {
    return this.resourceManager.resourcesAt(this.tick).supply
  }

  /**
   * The total amount of supply produced from all buildings.
   * @type {Number}
   */
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

  /**
   * An inprogress state of a unit, with the start, end, and current ticks for the unit.
   * @type {Object[]}
   */
  get inprogressUnits() {
    let id = 0
    return this.actions.reduce((units, action) => {
      if (
        action.type === "train" &&
        action.start <= this.tick &&
        action.start + action.duration > this.tick
      ) {
        units.push({
          unit: action.meta.unit,
          start: action.start,
          end: action.start + action.duration,
          current: this.tick,
          inprogressId: id++,
        })
      }
      return units
    }, [])
  }

  /**
   * An inprogress state of a building, with the start, end, and current ticks for the building.
   * @type {Object[]}
   */
  get inprogressBuildings() {
    // prevent key conflicts in ids
    let id = this.buildings.length + 1
    return this.actions.reduce((buildings, action) => {
      if (
        action.type === "build" &&
        action.start <= this.tick &&
        action.start + action.duration > this.tick
      ) {
        buildings.push({
          unit: action.meta.building,
          start: action.start,
          end: action.start + action.duration,
          current: this.tick,
          inprogressId: id++,
        })
      }
      return buildings
    }, [])
  }

  /**
   * All of the buildings that have been completed by the current tick. Including unavailable buildings.
   * @type {Building[]}
   */
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

  /**
   * All of the units that have been completed by the current tick. Including unavailable units.
   * @type {Unit[]}
   */
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

  /**
   * All of the upgrades that have been completed by the current tick.
   * @type {Upgrade[]}
   */
  get completedUpgrades() {
    return this.resourceManager.resourcesAt(this.tick).upgrades
  }

  /**
   * All of the items that have been purchased by the current tick.
   * @type {Item[]}
   */
  get purchasedItems() {
    return this.resourceManager.resourcesAt(this.tick).items
  }
}
