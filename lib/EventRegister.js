import clonedeep from "lodash.clonedeep"

import Building from "./Building"
import EventsProcessor from "./EventsProcessor"
import Item from "./Item"
import ResourceEvent from "./ResourceEvent"
import ResourceList from "./ResourceList"
import TickEvents from "./TickEvents"
import Unit from "./Unit"

export default class EventRegister {
  eventsProcessor = new EventsProcessor()

  eventsIndices = []

  events = {}

  constructor(startingResources) {
    this.startingResources = startingResources
    this.resetEvents()
  }

  eventsAt(tick) {
    const indexLocation = this.eventsIndices.indexOf(tick)
    if (indexLocation < 0) {
      this.events[tick] = new TickEvents(tick)
      this.eventsIndices.push(tick)
      this.eventsIndices.sort((a, b) => a - b)
    }
    return this.events[tick]
  }

  resourceEventsAt(tick) {
    const indexLocation = this.resourceEventsIndices.indexOf(tick)
    if (indexLocation < 0) {
      this.resourceEvents[tick] = []
      this.resourceEventsIndices.push(tick)
      this.resourceEventsIndices.sort((a, b) => a - b)

      // Make an event so we stop for resource calculation
      this.eventsAt(tick)
    }
    return this.resourceEvents[tick]
  }

  resetEvents() {
    this.resourceEventsIndices = []
    this.resourceEvents = {}

    const toRemove = []
    for (const index of this.eventsIndices) {
      if (!this.events[index].actions.length) {
        toRemove.push(index)
      }
    }

    this.eventsIndices = this.eventsIndices.filter(
      ei => toRemove.indexOf(ei) === -1,
    )
    for (const removeIndex of toRemove) {
      delete this.resourceEvents[removeIndex]
    }

    const initialResourceEvent = new ResourceEvent(0, null)

    const startingGain = clonedeep(this.startingResources.value)

    Building.resetIds()
    Unit.resetIds()
    Item.resetIds()
    startingGain.units.map(u => new Unit(u))
    startingGain.buildings.map(u => new Building(u))

    initialResourceEvent.gainResources(startingGain)
    initialResourceEvent.loseResources({ supply: 5 })
    this.addResourceEvent(initialResourceEvent)
  }

  forEachEvent(cb) {
    for (let i = 0; i < this.eventsIndices.length; i++) {
      const index = this.eventsIndices[i]
      cb(this.events[index], index)
    }
  }

  addAction(action) {
    this.eventsAt(action.start).addAction(action)
  }

  removeAction(tick, id) {
    this.eventsAt(tick).removeAction(id)
  }

  addResourceEvent(resourceEvent) {
    this.resourceEventsAt(resourceEvent.tick).push(resourceEvent)
  }
}
