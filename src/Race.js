import neutralBuildings from "../data/neutral/buildings"

export default class Race {
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

  static neutralBuildings = neutralBuildings
}
