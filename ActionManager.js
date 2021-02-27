import Action from "./Action.js";
import EventsProcessor from "./EventsProcessor.js";
import EventRegister from "./EventRegister.js";
import ResourceList from "./ResourceList.js";

export default function ActionManager(race, resourcesManager) {
  this.eventsProcessor = new EventsProcessor();
  this.eventsRegister = new EventRegister(race.startingResources);
  this.resourcesManager = resourcesManager;

  this.processEvents();
}

ActionManager.prototype.addAction = function(action) {
  // Add the action event to the registry
  this.eventsRegister.addAction(action);
  // Reset our accumulated resources
  this.resourcesManager.reset();
  // Reset previous resource events
  this.eventsRegister.resetEvents();

  this.processEvents();
};

ActionManager.prototype.processEvents = function() {
  this.eventsRegister.forEachEvent((event, index) => {
    // Sum up resource events added by previous actions.
    const gains = this.eventsRegister
      .resourceEventsAt(event.tick)
      .flatMap((re) => re.resourceGain);
    const losses = this.eventsRegister
      .resourceEventsAt(event.tick)
      .flatMap((re) => re.resourceLoss);

    // Get starting resources
    const resourcesForTick = new ResourceList(
      this.resourcesManager.resourcesAt(event.tick)
    );

    // Add in all the new gains
    for (const gain of gains) {
      resourcesForTick.addValues(gain);
    }

    // Subtract any losses
    for (const loss of losses) {
      resourcesForTick.removeValues(loss);
    }

    // Set validity of existing actions
    this.eventsProcessor.validateActions(event.actions, resourcesForTick);

    // Process actions to get new resource events.
    for (const eventAction of event.actions) {
      const resourceEvents = this.eventsProcessor.processAction(eventAction);

      for (const re of resourceEvents) {
        if (re.tick === event.tick) {
          resourcesForTick.addValues(re.resourceGain);
          resourcesForTick.removeValues(re.resourceLoss);
        } else {
          this.eventsRegister.addResourceEvent(re);
        }
      }
    }

    // Save the resources value for this tick
    this.resourcesManager.setResources(event.tick, resourcesForTick);
  });
};

ActionManager.prototype.removeAction = function(action) {
  // Remove the action from the registery
  this.eventsRegister.removeAction(action.start, action._id);
  // Reset our accumulated resources
  this.resourcesManager.reset();
  // Reset previous resource events
  this.eventsRegister.resetEvents();

  this.processEvents();
};

ActionManager.prototype.train = function(tick, unit, building) {
  this.addAction(Action.train(tick, unit, building));
};

ActionManager.prototype.build = function(tick, worker, building) {
  this.addAction(Action.build(tick, worker, building));
};

ActionManager.prototype.assignToGold = function(tick, worker) {
  this.addAction(Action.assignToGold(tick, worker));
};

ActionManager.prototype.assignToLumber = function(tick, worker) {
  this.addAction(Action.assignToLumber(tick, worker));
};

ActionManager.prototype.getActions = function() {
  let actions = [];
  this.eventsRegister.forEachEvent((e) => actions.push(...e.actions));
  return actions;
};
