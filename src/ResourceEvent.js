import ResourceList from "./ResourceList"

export default class ResourceEvent {
  resourceLoss = new ResourceList()

  resourceGain = new ResourceList()

  constructor(tick, actionId) {
    this.actionId = actionId
    this.tick = tick
  }

  loseResources(resourceList) {
    let resources = resourceList
    if (!(resourceList instanceof ResourceList)) {
      resources = new ResourceList(resources)
    }
    this.resourceLoss.addValues(resourceList)
  }

  gainResources(resourceList) {
    let resources = resourceList
    if (!(resourceList instanceof ResourceList)) {
      resources = new ResourceList(resources)
    }
    this.resourceGain.addValues(resourceList)
  }
}
