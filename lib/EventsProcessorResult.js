import ResourceList from "./ResourceList";

export default class EventsProcessorResult {
  gains = [];

  losses = [];

  addGain(tick, resourceList) {
    this.gains.push({ tick, resources: resourceList });
  }

  addLoss(tick, resourceList) {
    this.losses.push({ tick, resources: resourceList });
  }
}
