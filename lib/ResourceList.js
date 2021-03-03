export default class ResourceList {
  constructor(value = {}) {
    this.value = value;
  }

  addValues(resources) {
    let resourceList = resources;
    if (!(resourceList instanceof ResourceList)) {
      resourceList = new ResourceList(resourceList);
    }

    for (const [key, value] of Object.entries(resourceList.value)) {
      if (key in this.value) {
        if (Array.isArray(this.value[key])) {
          if (Array.isArray(value)) {
            this.value[key] = this.value[key].concat(value);
          } else {
            this.value[key].push(value);
          }
        } else {
          this.value[key] += value;
        }
      } else {
        this.value[key] = value;
      }
    }
  }

  removeValues(resources) {
    let resourceList = resources;
    if (!(resourceList instanceof ResourceList)) {
      resourceList = new ResourceList(resourceList);
    }
    for (const [key, value] of Object.entries(resourceList.value)) {
      if (key in this.value) {
        if (Array.isArray(this.value[key])) {
          if (Array.isArray(value)) {
            for (const v of value) {
              const index = this.value[key].findIndex((i) => i._id === v._id);
              this.value[key].splice(index, 1);
            }
          } else {
            const index = this.value[key].findIndex((i) => i._id === value._id);
            this.value[key].splice(index, 1);
          }
        } else {
          this.value[key] -= value;
        }
      } else {
        throw new Error("Unable to lose resource, none accumulated.");
      }
    }
  }
}
