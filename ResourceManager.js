import clonedeep from "lodash.clonedeep";

import ResourceList from "./ResourceList.js";

export default function ResourceManager() {
    this.reset();
}

ResourceManager.prototype.reset = function() {
  this.resourcesIndices = [];
  this.resources = {};
}

ResourceManager.prototype.setResources = function(tick, resourceList) {
    this.resourcesIndices.push(tick);
    this.resourcesIndices.sort((a, b) => a - b);
    this.resources[tick] = resourceList.value;
}

ResourceManager.prototype.resourcesAt = function(tick) {
    let closest = null;
    for (const index of this.resourcesIndices) {
        if (index < tick) {
            closest = index;
        } else if (index === tick) {
            return this.resources[index];
        }
    }

    if (closest === null) {
        return {};
    }

    const timeDiff = tick - closest;
    const clonedResources = clonedeep(this.resources[closest]);

    if (this.resources[closest].miningWorkers) {
        clonedResources.gold += Math.min(this.resources[closest].miningWorkers, 5) * timeDiff * 2;
    }

    if (this.resources[closest].harvestingWorkers) {
        clonedResources.lumber += this.resources[closest].harvestingWorkers * timeDiff * 1;
    }

    return clonedResources;
};