import Building from "./Building"
import BuildingManager from "./BuildingManager"
import Orc from "./Orc"
import Unit from "./Unit"
import Upgrade from "./Upgrade"

describe("BuildingManager", () => {
  it("should return the correct available buildings that meet dependencies", () => {
    const manager = new BuildingManager(Orc)

    const warMill = Orc.buildings.find(b => b.id === "warMill")
    const watchTower = Orc.buildings.find(b => b.id === "watchTower")

    const gold = watchTower.gold
    const lumber = watchTower.lumber

    const buildings = []
    let available = manager.availableBuildings({ buildings, gold, lumber })

    expect(available.find(a => a.id === "watchTower")).toEqual(undefined)

    buildings.push(new Building(warMill))
    available = manager.availableBuildings({ buildings, gold, lumber })

    expect(available.find(a => a.id === "watchTower")).toEqual(watchTower)
  })

  it("should not return a building as available if gold is too low", () => {
    const manager = new BuildingManager(Orc)

    const barracksData = Orc.buildings.find(b => b.id === "barracks")

    const gold = barracksData.gold - 1
    const lumber = barracksData.lumber
    const buildings = []

    const available = manager.availableBuildings({ buildings, gold, lumber })

    expect(available.find(a => a.id === "barracks")).toEqual(undefined)
  })

  it("should not return a building as available if lumber is too low", () => {
    const manager = new BuildingManager(Orc)

    const barracksData = Orc.buildings.find(b => b.id === "barracks")

    const gold = barracksData.gold
    const lumber = barracksData.lumber - 1
    const buildings = []

    const available = manager.availableBuildings({ buildings, gold, lumber })

    expect(available.find(a => a.id === "barracks")).toEqual(undefined)
  })

  it("should return the correct available units", () => {
    const manager = new BuildingManager(Orc)

    const peon = Orc.units.find(u => u.id === "peon")
    const grunt = Orc.units.find(u => u.id === "grunt")
    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)
    const barracksData = Orc.buildings.find(b => b.id === "barracks")
    const barracks = new Building(barracksData)

    const gold = peon.gold
    const lumber = peon.lumber
    const supply = peon.supply

    let available = manager.availableUnits(greatHall, {
      gold: 0,
      lumber: 0,
      supply: 0,
    })

    expect(available.find(a => a.id === peon.id)).toEqual(undefined)

    available = manager.availableUnits(greatHall, { gold, lumber, supply })

    expect(available.find(a => a.id === peon.id)).toEqual(peon)

    available = manager.availableUnits(
      greatHall,
      grunt.gold,
      grunt.lumber,
      grunt.supply,
    )

    expect(available.find(a => a.id === grunt.id)).toEqual(undefined)
  })

  it("should not show a unit as available if gold is too low", () => {
    const manager = new BuildingManager(Orc)

    const peon = Orc.units.find(u => u.id === "peon")
    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const gold = peon.gold - 1
    const lumber = peon.lumber
    const supply = peon.supply

    let available = manager.availableUnits(greatHall, { gold, lumber, supply })

    expect(available.find(a => a.id === peon.id)).toEqual(undefined)

    available = manager.availableUnits(greatHall, {
      gold: gold + 1,
      lumber,
      supply,
    })

    expect(available.find(a => a.id === peon.id)).toEqual(peon)
  })

  it("should not show a unit as available if lumber is too low", () => {
    const manager = new BuildingManager(Orc)

    const peon = Orc.units.find(u => u.id === "peon")
    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const gold = peon.gold
    const lumber = peon.lumber - 1
    const supply = peon.supply

    let available = manager.availableUnits(greatHall, { gold, lumber, supply })

    expect(available.find(a => a.id === peon.id)).toEqual(undefined)

    available = manager.availableUnits(greatHall, {
      gold,
      lumber: lumber + 1,
      supply,
    })

    expect(available.find(a => a.id === peon.id)).toEqual(peon)
  })

  it("should not show a unit as available if supply is too low", () => {
    const manager = new BuildingManager(Orc)

    const peon = Orc.units.find(u => u.id === "peon")
    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const gold = peon.gold
    const lumber = peon.lumber
    const supply = peon.supply - 1

    let available = manager.availableUnits(greatHall, { gold, lumber, supply })

    expect(available.find(a => a.id === peon.id)).toEqual(undefined)

    available = manager.availableUnits(greatHall, {
      gold,
      lumber,
      supply: supply + 1,
    })

    expect(available.find(a => a.id === peon.id)).toEqual(peon)
  })

  it("should not show heros as available if one is built and tier 2 building not produced", () => {
    const manager = new BuildingManager(Orc)

    const bladeMasterData = Orc.units.find(u => u.id === "bladeMaster")
    const bladeMaster = new Unit(bladeMasterData)

    const shadowHunterData = Orc.units.find(u => u.id === "shadowHunter")
    const shadowHunter = new Unit(shadowHunterData)

    const altarData = Orc.buildings.find(b => b.id === "altarOfStorms")
    const altar = new Building(altarData)

    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const units = [bladeMaster]
    const buildings = [altar, greatHall]

    const resources = {
      gold: shadowHunter.gold,
      lumber: shadowHunter.lumber,
      supply: shadowHunter.supply,
      units,
      buildings,
    }

    let available = manager.availableUnits(altar, resources)

    expect(available.find(a => a.id === shadowHunter.id)).toEqual(undefined)
  })

  it("should show heros as available if one is built and tier 2 building is produced", () => {
    const manager = new BuildingManager(Orc)

    const bladeMasterData = Orc.units.find(u => u.id === "bladeMaster")
    const bladeMaster = new Unit(bladeMasterData)

    const shadowHunterData = Orc.units.find(u => u.id === "shadowHunter")
    const shadowHunter = new Unit(shadowHunterData)

    const altarData = Orc.buildings.find(b => b.id === "altarOfStorms")
    const altar = new Building(altarData)

    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const strongholdData = Orc.upgrades.find(b => b.id === "stronghold")
    const stronghold = new Upgrade(strongholdData)

    const units = [bladeMaster]
    const buildings = [altar, greatHall]
    const upgrades = [stronghold]

    const resources = {
      gold: shadowHunter.gold,
      lumber: shadowHunter.lumber,
      supply: shadowHunter.supply,
      units,
      buildings,
      upgrades,
    }

    let available = manager.availableUnits(altar, resources)

    expect(available.find(a => a.id === shadowHunter.id)).toEqual(
      shadowHunterData,
    )
  })

  it("should not show heros as available if two are built and tier 3 building is not produced", () => {
    const manager = new BuildingManager(Orc)

    const bladeMasterData = Orc.units.find(u => u.id === "bladeMaster")
    const bladeMaster = new Unit(bladeMasterData)

    const shadowHunterData = Orc.units.find(u => u.id === "shadowHunter")
    const shadowHunter = new Unit(shadowHunterData)

    const taurenChieftainData = Orc.units.find(u => u.id === "taurenChieftain")
    const taurenChieftain = new Unit(taurenChieftainData)

    const altarData = Orc.buildings.find(b => b.id === "altarOfStorms")
    const altar = new Building(altarData)

    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const strongholdData = Orc.upgrades.find(b => b.id === "stronghold")
    const stronghold = new Upgrade(strongholdData)

    const units = [bladeMaster, shadowHunter]
    const buildings = [altar, greatHall]
    const upgrades = [stronghold]

    const resources = {
      gold: shadowHunter.gold,
      lumber: shadowHunter.lumber,
      supply: shadowHunter.supply,
      units,
      upgrades,
      buildings,
    }

    let available = manager.availableUnits(altar, resources)

    expect(available.find(a => a.id === taurenChieftain.id)).toEqual(undefined)
  })

  it("should show heros as available if two are built and tier 3 building is produced", () => {
    const manager = new BuildingManager(Orc)

    const bladeMasterData = Orc.units.find(u => u.id === "bladeMaster")
    const bladeMaster = new Unit(bladeMasterData)

    const shadowHunterData = Orc.units.find(u => u.id === "shadowHunter")
    const shadowHunter = new Unit(shadowHunterData)

    const taurenChieftainData = Orc.units.find(u => u.id === "taurenChieftain")
    const taurenChieftain = new Unit(taurenChieftainData)

    const altarData = Orc.buildings.find(b => b.id === "altarOfStorms")
    const altar = new Building(altarData)

    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const strongholdData = Orc.upgrades.find(b => b.id === "stronghold")
    const stronghold = new Upgrade(strongholdData)

    const fortressData = Orc.upgrades.find(b => b.id === "fortress")
    const fortress = new Upgrade(fortressData)

    const units = [bladeMaster, shadowHunter]
    const upgrades = [stronghold, fortress]
    const buildings = [altar, greatHall]

    const resources = {
      gold: shadowHunter.gold,
      lumber: shadowHunter.lumber,
      supply: shadowHunter.supply,
      units,
      buildings,
      upgrades,
    }

    let available = manager.availableUnits(altar, resources)

    expect(available.find(a => a.id === taurenChieftain.id)).toEqual(
      taurenChieftainData,
    )
  })

  it("should return the correct available upgrades", () => {
    const manager = new BuildingManager(Orc)

    const spikedBarricadesData = Orc.upgrades.find(
      u => u.id === "spikedBarricades",
    )

    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const warMillData = Orc.buildings.find(b => b.id === "warMill")
    const warMill = new Building(warMillData)

    let available = manager.availableUpgrades(warMill, {
      buildings: [greatHall, warMill],
      gold: 0,
      lumber: 0,
    })

    expect(available.find(a => a.id === spikedBarricadesData.id)).toEqual(
      undefined,
    )

    available = manager.availableUpgrades(warMill, {
      buildings: [greatHall, warMill],
      gold: spikedBarricadesData.gold,
      lumber: spikedBarricadesData.lumber,
    })

    expect(!!available.find(a => a.id === spikedBarricadesData.id)).toEqual(
      true,
    )
  })

  it("should return the correct available upgrades with dependencies", () => {
    const manager = new BuildingManager(Orc)

    const trollRegenerationData = Orc.upgrades.find(
      u => u.id === "trollRegeneration",
    )

    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const strongholdData = Orc.upgrades.find(b => b.id === "stronghold")
    const stronghold = new Upgrade(strongholdData)

    const barracksData = Orc.buildings.find(b => b.id === "barracks")
    const barracks = new Building(barracksData)

    const warMillData = Orc.buildings.find(b => b.id === "warMill")
    const warMill = new Building(warMillData)

    let available = manager.availableUpgrades(barracks, {
      buildings: [greatHall, barracks],
      upgrades: [],
      gold: trollRegenerationData.gold,
      lumber: trollRegenerationData.lumber,
    })

    expect(available.find(a => a.id === trollRegenerationData.id)).toEqual(
      undefined,
    )

    available = manager.availableUpgrades(barracks, {
      buildings: [greatHall, barracks, warMill],
      upgrades: [stronghold],
      gold: trollRegenerationData.gold,
      lumber: trollRegenerationData.lumber,
    })

    expect(!!available.find(a => a.id === trollRegenerationData.id)).toEqual(
      true,
    )
  })

  it("should return the correct available upgrades if already researched", () => {
    const manager = new BuildingManager(Orc)

    const trollRegenerationData = Orc.upgrades.find(
      u => u.id === "trollRegeneration",
    )
    const trollRegeneration = new Upgrade(trollRegenerationData)

    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const strongholdData = Orc.upgrades.find(b => b.id === "stronghold")
    const stronghold = new Upgrade(strongholdData)

    const barracksData = Orc.buildings.find(b => b.id === "barracks")
    const barracks = new Building(barracksData)

    const warMillData = Orc.buildings.find(b => b.id === "warMill")
    const warMill = new Building(warMillData)

    let available = manager.availableUpgrades(barracks, {
      buildings: [greatHall, barracks, warMill],
      upgrades: [stronghold, trollRegenerationData],
      gold: trollRegenerationData.gold,
      lumber: trollRegenerationData.lumber,
    })

    expect(!!available.find(a => a.id === trollRegenerationData.id)).toEqual(
      false,
    )
  })

  it("should return the correct available upgrades if replaced version not researched", () => {
    const manager = new BuildingManager(Orc)

    const steelMeleeWeaponsData = Orc.upgrades.find(
      u => u.id === "steelMeleeWeapons",
    )
    const steelMeleeWeapons = new Upgrade(steelMeleeWeaponsData)

    const thoriumMeleeWeaponsData = Orc.upgrades.find(
      u => u.id === "thoriumMeleeWeapons",
    )

    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const strongholdData = Orc.upgrades.find(b => b.id === "stronghold")
    const stronghold = new Upgrade(strongholdData)

    const warMillData = Orc.buildings.find(b => b.id === "warMill")
    const warMill = new Building(warMillData)

    let available = manager.availableUpgrades(warMill, {
      buildings: [greatHall, warMill],
      upgrades: [stronghold],
      gold: thoriumMeleeWeaponsData.gold,
      lumber: thoriumMeleeWeaponsData.lumber,
    })

    expect(!!available.find(a => a.id === thoriumMeleeWeaponsData.id)).toEqual(
      false,
    )

    available = manager.availableUpgrades(warMill, {
      buildings: [greatHall, warMill],
      upgrades: [stronghold, steelMeleeWeaponsData],
      gold: thoriumMeleeWeaponsData.gold,
      lumber: thoriumMeleeWeaponsData.lumber,
    })

    expect(!!available.find(a => a.id === thoriumMeleeWeaponsData.id)).toEqual(
      true,
    )
  })

  it("should return the correct available upgrades if tier building is being upgraded", () => {
    const manager = new BuildingManager(Orc)

    const steelMeleeWeaponsData = Orc.upgrades.find(
      u => u.id === "steelMeleeWeapons",
    )
    const steelMeleeWeapons = new Upgrade(steelMeleeWeaponsData)

    const thoriumMeleeWeaponsData = Orc.upgrades.find(
      u => u.id === "thoriumMeleeWeapons",
    )

    const greatHallData = Orc.buildings.find(b => b.id === "greatHall")
    const greatHall = new Building(greatHallData)

    const strongholdData = Orc.upgrades.find(b => b.id === "stronghold")
    const stronghold = new Upgrade(strongholdData)

    const warMillData = Orc.buildings.find(b => b.id === "warMill")
    const warMill = new Building(warMillData)

    let available = manager.availableUpgrades(warMill, {
      buildings: [greatHall, warMill],
      upgrades: [steelMeleeWeapons],
      gold: thoriumMeleeWeaponsData.gold,
      lumber: thoriumMeleeWeaponsData.lumber,
    })

    expect(!!available.find(a => a.id === thoriumMeleeWeaponsData.id)).toEqual(
      false,
    )

    available = manager.availableUpgrades(warMill, {
      buildings: [greatHall, warMill],
      upgrades: [stronghold, steelMeleeWeaponsData],
      gold: thoriumMeleeWeaponsData.gold,
      lumber: thoriumMeleeWeaponsData.lumber,
    })

    expect(!!available.find(a => a.id === thoriumMeleeWeaponsData.id)).toEqual(
      true,
    )
  })
})
