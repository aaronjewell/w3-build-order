import ResourceList from "./ResourceList.js";

export default function ResourceEvent(tick, actionId) {
  this.actionId = actionId;
  this.tick = tick;
  this.resourceLoss = new ResourceList();
  this.resourceGain = new ResourceList();
}

ResourceEvent.prototype.loseResources = function(resourceList) {
  let resources = resourceList;
  if (!(resourceList instanceof ResourceList)) {
    resources = new ResourceList(resources);
  }
  this.resourceLoss.addValues(resourceList);
};

ResourceEvent.prototype.gainResources = function(resourceList) {
  let resources = resourceList;
  if (!(resourceList instanceof ResourceList)) {
    resources = new ResourceList(resources);
  }
  this.resourceGain.addValues(resourceList);
};
