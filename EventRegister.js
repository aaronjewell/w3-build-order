import EventsProcessor from "./EventsProcessor.js";
import ResourceEvent from "./ResourceEvent.js";
import ResourceList from "./ResourceList.js";
import TickEvents from "./TickEvents.js";

export default function EventRegister(startingResources = new ResourceList()) {
  this.startingResources = startingResources;
  this.eventsProcessor = new EventsProcessor();
  this.eventsIndices = [];
  this.events = {};
  this.resetEvents();
}

EventRegister.prototype.eventsAt = function (tick) {
  const indexLocation = this.eventsIndices.indexOf(tick);
  if (indexLocation < 0) {
    this.events[tick] = new TickEvents(tick);
    this.eventsIndices.push(tick);
    this.eventsIndices.sort((a, b) => a - b);
  }
  return this.events[tick];
};

EventRegister.prototype.resourceEventsAt = function (tick) {
  const indexLocation = this.resourceEventsIndices.indexOf(tick);
  if (indexLocation < 0) {
    this.resourceEvents[tick] = [];
    this.resourceEventsIndices.push(tick);
    this.resourceEventsIndices.sort((a, b) => a - b);

    // Make an event so we stop for resource calculation
    this.eventsAt(tick);
  }
  return this.resourceEvents[tick];
};

EventRegister.prototype.resetEvents = function () {
  this.resourceEventsIndices = [];
  this.resourceEvents = {};

  const toRemove = [];
  for (const index of this.eventsIndices) {
      if (!this.events[index].actions.length) {
          toRemove.push(index);
      }
  }
  

  this.eventsIndices = this.eventsIndices.filter(ei => toRemove.indexOf(ei) === -1);
  for (const removeIndex of toRemove) {
      delete this.resourceEvents[removeIndex];
  }

  const initialResourceEvent = new ResourceEvent(0, null);
  initialResourceEvent.gainResources(JSON.parse(JSON.stringify(this.startingResources.value)));
  initialResourceEvent.loseResources({ supply: 5 })
  this.addResourceEvent(initialResourceEvent);
};

EventRegister.prototype.forEachEvent = function (cb) {
  for (let i = 0; i < this.eventsIndices.length; i++) {
    const index = this.eventsIndices[i];
    cb(this.events[index], index);
  }
};

EventRegister.prototype.addAction = function (action) {
  this.eventsAt(action.start).addAction(action);
};

EventRegister.prototype.removeAction = function (tick, id) {
  this.eventsAt(tick).removeAction(id);
};

EventRegister.prototype.addResourceEvents = function (resourceEvents) {
  for (re of resourceEvents) {
    this.addResourceEvent(re);
  }
};

EventRegister.prototype.addResourceEvent = function (resourceEvent) {
  this.resourceEventsAt(resourceEvent.tick).push(resourceEvent);
};
