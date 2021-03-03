import Building from "./Building.js";
import ResourceEvent from "./ResourceEvent.js";
import ResourceList from "./ResourceList.js";
import Unit from "./Unit.js";

export default class EventsProcessor {
  validateActions(actions, resourceList) {
    const processedActions = [];

    for (const action of actions) {
      action.valid = true;
      action.error = null;

      switch (action.type) {
        case "build":
          // Check for sufficient resources
          if (
            resourceList.value.gold < action.meta.building.gold ||
            resourceList.value.lumber < action.meta.building.lumber
          ) {
            action.valid = false;
            action.error = "not enough resources";
          }
          break;
        case "train":
          if (
            resourceList.value.gold < action.meta.unit.gold ||
            resourceList.value.lumber < action.meta.unit.lumber ||
            resourceList.value.supply < action.meta.unit.supply
          ) {
            action.valid = false;
            action.error = "not enough resources";
          }

          if (
            !resourceList.value.buildings.find(
              (b) => b.id === action.meta.building.id
            )
          ) {
            action.valid = false;
            action.error = "building no longer available for training";
          }

          if (
            processedActions.filter(
              (a) =>
                a.type === "train" &&
                a.meta.building._id === action.meta.building._id &&
                a.start + a.duration >= action.start &&
                a.start + a.duration <= action.start + action.duration
            ).length
          ) {
            action.valid = false;
            action.error = "building is busy training";
          }

          if (
            action.meta.unit.limit &&
            action.meta.unit.limit <=
              processedActions.filter(
                (a) =>
                  a.type === "train" && a.meta.unit.id === action.meta.unit.id
              ).length
          ) {
            action.valid = false;
            action.error = "too many of this unit produced";
          }
          break;
        case "assignToGold":
          break;
        case "assignToLumber":
          break;
      }

      processedActions.push(action);
    }
  }
  processAction(action) {
    const resourceEvents = [];
    switch (action.type) {
      case "build":
        var immediateLoss = new ResourceEvent(action.start, action._id);
        immediateLoss.loseResources({
          gold: action.meta.building.gold,
          lumber: action.meta.building.lumber,
          units: [action.meta.worker],
        });

        var futureGain = new ResourceEvent(
          action.start + action.duration,
          action._id
        );
        futureGain.gainResources({
          supply: action.meta.building.supply,
          buildings: [new Building(action.meta.building)],
          units: [action.meta.worker],
        });

        resourceEvents.push(immediateLoss, futureGain);
        break;
      case "train":
        var immediateLoss = new ResourceEvent(action.start, action._id);
        immediateLoss.loseResources({
          supply: action.meta.unit.supply,
          gold: action.meta.unit.gold,
          lumber: action.meta.unit.lumber,
          supply: action.meta.unit.supply,
          buildings: [action.meta.building],
        });

        var futureGain = new ResourceEvent(
          action.start + action.duration,
          action._id
        );
        futureGain.gainResources({
          units: [new Unit(action.meta.unit)],
          buildings: [action.meta.building],
        });

        resourceEvents.push(immediateLoss, futureGain);
        break;
      case "assignToGold":
        var immediateLoss = new ResourceEvent(action.start, action._id);
        immediateLoss.loseResources({
          units: [action.meta.worker],
        });

        var immediateGain = new ResourceEvent(action.start, action._id);
        immediateGain.gainResources({ miningWorkers: 1 });

        resourceEvents.push(immediateGain, immediateLoss);
        break;
      case "assignToLumber":
        var immediateLoss = new ResourceEvent(action.start, action._id);
        immediateLoss.loseResources({
          units: [action.meta.worker],
        });

        var immediateGain = new ResourceEvent(action.start, action._id);
        immediateGain.gainResources({ harvestingWorkers: 1 });

        resourceEvents.push(immediateGain, immediateLoss);
        break;
    }
    return resourceEvents;
  }
}
