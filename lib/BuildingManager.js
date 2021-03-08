import upgrades from "../data/orc/upgrades"

export default class BuildingManager {
  constructor(race) {
    this.race = race
  }

  allItems(building) {
    return building.items.map(id =>
      this.race.items.find(item => item.id === id),
    )
  }

  allUnits(building) {
    return building.units.map(id =>
      this.race.units.find(unit => unit.id === id),
    )
  }

  allUpgrades(building) {
    return building.upgrades.map(id =>
      this.race.upgrades.find(upgrade => upgrade.id === id),
    )
  }

  allBuildings() {
    return this.race.buildings
  }

  availableItems(building, tick, { upgrades, gold, lumber }) {
    return this.allItems(building)
      .filter(i => i.gold <= gold && i.lumber <= lumber)
      .filter(i => {
        return (
          tick >= i.replenish &&
          i.dependsOn.every(dependency => {
            return upgrades.some(completed => completed.id === dependency)
          })
        )
      })
  }

  availableBuildings({ buildings, gold, lumber }) {
    return this.race.buildings
      .filter(b => {
        return b.dependsOn.every(dependency => {
          return buildings.some(completed => completed.id === dependency)
        })
      })
      .filter(b => b.gold <= gold && b.lumber <= lumber)
  }

  availableUnits(
    building,
    { units = [], upgrades = [], buildings = [], gold, lumber, supply },
  ) {
    const heroCount = units.filter(u => u.isHero).length
    const tier = upgrades.reduce(
      (highestTier, upgrade) => Math.max(highestTier, upgrade.tier || 1),
      1,
    )

    return this.allUnits(building)
      .filter(u => u.gold <= gold && u.lumber <= lumber && u.supply <= supply)
      .filter(u => !(u.isHero && heroCount === tier) || !u.isHero)
  }

  availableUpgrades(building, { buildings = [], upgrades = [], gold, lumber }) {
    return (
      this.allUpgrades(building)
        // Have enough gold and lumber
        .filter(u => u.gold <= gold && u.lumber <= lumber)
        // Each building and upgrade dependency is met
        .filter(u => {
          return (
            u.dependsOn.buildings.every(dependency => {
              return buildings.some(completed => completed.id === dependency)
            }) &&
            u.dependsOn.upgrades.every(dependency => {
              return upgrades.some(completed => completed.id === dependency)
            })
          )
        })
        // Not already researched
        .filter(u => !upgrades.find(upgrade => upgrade.id === u.id))
        // Doesn't replace anything or the upgrade it replaces is researched
        .filter(
          u =>
            !u.replaces || upgrades.find(upgrade => u.replaces === upgrade.id),
        )
    )
  }
}
