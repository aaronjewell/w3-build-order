import Action from "./Action"
import Building from "./Building"
import EventRegister from "./EventRegister"
import Orc from "./Orc"
import ResourceList from "./ResourceList"
import TickEvent from "./TickEvents"
import Unit from "./Unit"

import orcBuildings from "../data/orc/buildings"
import orcUnits from "../data/orc/units"

describe("EventRegister", () => {
  it("should add TickEvents to the correct index", () => {
    const register = new EventRegister(Orc.startingResources)

    const event = register.eventsAt(10)

    expect(register.eventsIndices.includes(10)).toEqual(true)
    expect(!!register.events[10]).toEqual(true)
  })

  it("should add event actions", () => {
    const tick = 0
    const register = new EventRegister(Orc.startingResources)

    const events = register.eventsAt(tick)

    expect(events.actions.length).toEqual(0)

    const peonData = orcUnits.find(u => u.id === "peon")
    const greatHallData = orcBuildings.find(b => b.id === "greatHall")

    const greatHall = new Building(greatHallData)

    const action = Action.train(tick, peonData, greatHall)

    register.addAction(action)

    expect(events.actions.length).toEqual(1)
  })

  it("should remove event actions by id", () => {
    const tick = 0
    const register = new EventRegister(Orc.startingResources)

    const events = register.eventsAt(tick)

    const peonData = orcUnits.find(u => u.id === "peon")
    const greatHallData = orcBuildings.find(b => b.id === "greatHall")

    const greatHall = new Building(greatHallData)

    const action = Action.train(tick, peonData, greatHall)

    register.addAction(action)

    expect(events.actions.length).toEqual(1)

    register.removeAction(tick, action._id)

    expect(events.actions.length).toEqual(0)
  })
})
