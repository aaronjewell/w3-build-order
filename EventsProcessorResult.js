import ResourceList from "./ResourceList.js";

export default function EventsProcessorResult() {
    this.gains = [];
    this.losses = [];
}

EventsProcessorResult.prototype.addGain = function(tick, resourceList) {
    this.gains.push({ tick, resources: resourceList });
}

EventsProcessorResult.prototype.addLoss = function(tick, resourceList) {
    this.losses.push({ tick, resources: resourceList });
}