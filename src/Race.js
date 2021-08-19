import neutralBuildings from "../data/neutral/buildings"

export default class Race {
  static version = "v1.32.9"

  buildings() {
    return this.constructor.buildings || []
  }
  items() {
    return this.constructor.items || []
  }
  units() {
    return this.constructor.units || []
  }
  upgrades() {
    return this.constructor.upgrades || []
  }

  static get neutralBuildings() {
    return neutralBuildings[Race.version]
  }
}
