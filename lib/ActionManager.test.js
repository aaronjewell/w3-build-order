import Action from "./Action"
import ActionManager from "./ActionManager"
import Building from "./Building"
import Orc from "./Orc"
import ResourceManager from "./ResourceManager"
import Unit from "./Unit"

import orcUnits from "../data/orc/units"
import orcBuildings from "../data/orc/buildings"

describe("ActionManager", () => {
  describe("constructor", () => {
    it("should add the race starting resources to the register", () => {
      const resourceManager = new ResourceManager()
      const actionManager = new ActionManager(Orc, resourceManager)

      const tick = 0

      const resources = resourceManager.resourcesAt(tick)

      expect(resources.buildings.length).toEqual(
        Orc.startingResources.value.buildings.length,
      )
      expect(resources.units.length).toEqual(
        Orc.startingResources.value.units.length,
      )
      expect(resources.gold).toEqual(Orc.startingResources.value.gold)
      expect(resources.lumber).toEqual(Orc.startingResources.value.lumber)
    })
  })

  describe("train", () => {
    it("should update the correct resources after processing train events", () => {
      const resourceManager = new ResourceManager()
      const actionManager = new ActionManager(Orc, resourceManager)

      const tick = 0

      const peonData = orcUnits.find(u => u.id === "peon")

      const greatHall = resourceManager
        .resourcesAt(tick)
        .buildings.find(b => b.id === "greatHall")

      actionManager.train(tick, peonData, greatHall)

      expect(resourceManager.resourcesAt(tick + 1).buildings.length).toEqual(0)
      expect(resourceManager.resourcesAt(tick + 1).units.length).toEqual(5)
      expect(
        resourceManager.resourcesAt(tick + peonData.buildTime).buildings.length,
      ).toEqual(1)
      expect(
        resourceManager.resourcesAt(tick + peonData.buildTime).units.length,
      ).toEqual(6)
    })
  })

  describe("build", () => {
    it("should update the correct number of resources after a build event", () => {
      const resourceManager = new ResourceManager()
      const actionManager = new ActionManager(Orc, resourceManager)

      const tick = 0

      const orcBurrowData = orcBuildings.find(b => b.id === "orcBurrow")

      const peon = resourceManager
        .resourcesAt(tick)
        .units.find(u => u.id === "peon")

      actionManager.build(tick, orcBurrowData, peon)

      expect(resourceManager.resourcesAt(tick + 1).buildings.length).toEqual(1)
      expect(resourceManager.resourcesAt(tick + 1).units.length).toEqual(4)
      expect(
        resourceManager.resourcesAt(tick + orcBurrowData.buildTime).buildings
          .length,
      ).toEqual(2)
      expect(
        resourceManager.resourcesAt(tick + orcBurrowData.buildTime).units
          .length,
      ).toEqual(5)
    })
  })

  describe("assignToGold", () => {
    it("should update the correct number of resources after an assign to gold event", () => {
      const resourceManager = new ResourceManager()
      const actionManager = new ActionManager(Orc, resourceManager)

      const tick = 0

      const [peon] = resourceManager.resourcesAt(tick).units

      actionManager.assignToGold(tick, peon)

      const resourcesAtOne = resourceManager.resourcesAt(tick + 1)
      expect(resourcesAtOne.buildings.length).toEqual(
        Orc.startingResources.value.buildings.length,
      )
      expect(resourcesAtOne.units.length).toEqual(
        Orc.startingResources.value.units.length - 1,
      )
      expect(resourcesAtOne.miningWorkers).toEqual(1)
      expect(resourcesAtOne.supply).toEqual(
        Orc.startingResources.value.supply -
          resourcesAtOne.units.length -
          resourcesAtOne.miningWorkers,
      )
    })
  })

  describe("assignToLumber", () => {
    it("should update the correct number of resources after an assign to lumber event", () => {
      const resourceManager = new ResourceManager()
      const actionManager = new ActionManager(Orc, resourceManager)

      const tick = 0

      const [peon] = resourceManager.resourcesAt(tick).units

      actionManager.assignToLumber(tick, peon)

      const resourcesAtOne = resourceManager.resourcesAt(tick + 1)
      expect(resourcesAtOne.buildings.length).toEqual(
        Orc.startingResources.value.buildings.length,
      )
      expect(resourcesAtOne.units.length).toEqual(
        Orc.startingResources.value.units.length - 1,
      )
      expect(resourcesAtOne.harvestingWorkers).toEqual(1)
      expect(resourcesAtOne.supply).toEqual(
        Orc.startingResources.value.supply -
          resourcesAtOne.units.length -
          resourcesAtOne.harvestingWorkers,
      )
    })
  })

  describe("getActions", () => {
    it("should return the correct list of actions", () => {
      const resourceManager = new ResourceManager()
      const actionManager = new ActionManager(Orc, resourceManager)

      const tick = 0

      const [peonOne, peonTwo] = resourceManager.resourcesAt(tick).units

      actionManager.assignToLumber(tick, peonOne)

      const actions = actionManager.getActions()
      expect(actions.length).toEqual(1)
      expect(actions[0].type).toEqual("assignToLumber")
      expect(actions[0].meta.worker).toEqual(peonOne)
      expect(actions[0].duration).toEqual(0)
      expect(actions[0].start).toEqual(tick)
      expect(actions[0].valid).toEqual(true)

      actionManager.assignToGold(tick, peonTwo)

      const newActions = actionManager.getActions()

      expect(newActions.length).toEqual(2)
      expect(newActions[1].type).toEqual("assignToGold")
      expect(newActions[1].meta.worker).toEqual(peonTwo)
      expect(newActions[1].duration).toEqual(0)
      expect(newActions[1].start).toEqual(tick)
      expect(newActions[1].valid).toEqual(true)
    })
  })

  describe("removeAction", () => {
    it("should remove an action from the registry", () => {
      const resourceManager = new ResourceManager()
      const actionManager = new ActionManager(Orc, resourceManager)

      const tick = 0

      const peonData = orcUnits.find(u => u.id === "peon")

      const peon = new Unit(peonData)

      actionManager.assignToLumber(tick, peon)

      const actionsBefore = actionManager.getActions()
      expect(actionsBefore.length).toEqual(1)

      actionManager.removeAction(actionsBefore[0])

      const actionsAfter = actionManager.getActions()
      expect(actionsAfter.length).toEqual(0)
    })
  })

  describe("addAction", () => {
    it("should add an action to the registry", () => {
      const resourceManager = new ResourceManager()
      const actionManager = new ActionManager(Orc, resourceManager)

      const tick = 0

      const peonData = orcUnits.find(u => u.id === "peon")

      const peon = new Unit(peonData)

      const action = Action.assignToLumber(tick, peon)

      const actionsBefore = actionManager.getActions()
      expect(actionsBefore.length).toEqual(0)

      actionManager.addAction(action)
      const actionsAfter = actionManager.getActions()
      expect(actionsAfter.length).toEqual(1)
    })
  })

  describe("processEvents", () => {
    it("interpolate gold and lumber resources between two ticks", () => {
      const resourceManager = new ResourceManager()
      const actionManager = new ActionManager(Orc, resourceManager)

      const tick = 0

      const [peonOne, peonTwo, ...rest] = resourceManager.resourcesAt(
        tick,
      ).units

      actionManager.assignToGold(tick, peonOne)
      actionManager.assignToLumber(tick, peonTwo)

      expect(resourceManager.resourcesAt(tick).gold).toEqual(
        Orc.startingResources.value.gold,
      )
      expect(resourceManager.resourcesAt(tick + 10).gold).toEqual(
        Orc.startingResources.value.gold +
          1 /** worker */ *
          2 /** gold per tick per worker */ *
            (tick + 10) /** ticks */,
      )
      expect(resourceManager.resourcesAt(tick + 10).lumber).toEqual(
        Orc.startingResources.value.lumber +
          1 /** worker */ *
          1 /** lumber per tick per worker */ *
            (tick + 10) /** ticks */,
      )
    })
  })
})
