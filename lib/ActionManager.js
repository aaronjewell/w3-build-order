import Action from "./Action";
import Building from "./Building"
import EventsProcessor from "./EventsProcessor";
import EventRegister from "./EventRegister";
import ResourceList from "./ResourceList";
import Unit from "./Unit";

export default class ActionManager {
  eventsProcessor = new EventsProcessor();

  constructor(race, resourcesManager) {
    this.eventsRegister = new EventRegister(race.startingResources);
    this.resourcesManager = resourcesManager;

    this.processEvents();
  }

  addAction(action) {
    // Add the action event to the registry
    this.eventsRegister.addAction(action);
    // Reset our accumulated resources
    this.resourcesManager.reset();
    // Reset previous resource events
    this.eventsRegister.resetEvents();

    this.processEvents();
  }

  processEvents() {
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
        if (eventAction.valid) {
          console.log(eventAction);
          const resourceEvents = this.eventsProcessor.processAction(
            eventAction
          );

          for (const re of resourceEvents) {
            if (re.tick === event.tick) {
              resourcesForTick.addValues(re.resourceGain);
              resourcesForTick.removeValues(re.resourceLoss);
            } else {
              this.eventsRegister.addResourceEvent(re);
            }
          }
        }
      }

      // Save the resources value for this tick
      this.resourcesManager.setResources(event.tick, resourcesForTick);
    });
  }

  removeAction(action) {
    // Remove the action from the registery
    this.eventsRegister.removeAction(action.start, action._id);
    // Reset our accumulated resources
    this.resourcesManager.reset();
    // Reset previous resource events
    this.eventsRegister.resetEvents();

    this.processEvents();
  }

  train(tick, unitData, building) {
    this.addAction(Action.train(tick, unitData, building));
  }

  build(tick, buildingData, worker) {
    this.addAction(Action.build(tick, buildingData, worker));
  }

  assignToGold(tick, worker) {
    this.addAction(Action.assignToGold(tick, worker));
  }

  assignToLumber(tick, worker) {
    this.addAction(Action.assignToLumber(tick, worker));
  }

  getActions() {
    let actions = [];
    this.eventsRegister.forEachEvent((e) => actions.push(...e.actions));
    return actions;
  }
}
