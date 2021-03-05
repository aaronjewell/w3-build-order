export default [
  {
    id: "altarOfStorms",
    name: "Altar of Storms",
    gold: 180,
    lumber: 50,
    buildTime: 60,
    supply: 0,
    dependsOn: [],
    order: 6,
    units: ["bladeMaster", "farSeer", "shadowHunter", "taurenChieftain"],
    upgrades: [],
    image: "orc/altarofstorms.png",
  },
  {
    id: "barracks",
    name: "Barracks",
    gold: 180,
    lumber: 50,
    buildTime: 60,
    supply: 0,
    dependsOn: [],
    order: 2,
    units: ["grunt"],
    upgrades: ["trollRegeneration", "berserkerUpgrade", "burningOil"],
    image: "orc/barracks.png",
  },
  {
    id: "beastiary",
    name: "Beastiary",
    gold: 145,
    lumber: 140,
    buildTime: 60,
    supply: 0,
    dependsOn: ["stronghold"],
    order: 8,
    units: [],
    upgrades: ["ensnare", "envenomedSpears", "liquidFire"],
    image: "orc/beastiary.png",
  },
  {
    id: "greatHall",
    name: "Great Hall",
    gold: 385,
    lumber: 185,
    buildTime: 150,
    supply: 11,
    tier: 1,
    dependsOn: [],
    order: 1,
    units: ["peon"],
    upgrades: ["pillage", "unitInventory", "stronghold", "fortress"],
    image: "orc/greathall.png",
  },
  {
    id: "orcBurrow",
    name: "Orc Burrow",
    gold: 160,
    lumber: 40,
    buildTime: 50,
    supply: 10,
    dependsOn: [],
    order: 5,
    units: [],
    upgrades: [],
    image: "orc/orcburrow.png",
  },
  {
    id: "spiritLodge",
    name: "Spirit Lodge",
    gold: 150,
    lumber: 135,
    buildTime: 70,
    supply: 0,
    dependsOn: ["stronghold"],
    order: 7,
    units: [],
    upgrades: [
      "shamanAdeptTraining",
      "shamanMasterTraining",
      "witchDoctorAdeptTraining",
      "witchDoctorMasterTraining",
    ],
    image: "orc/spiritlodge.png",
  },
  {
    id: "taurenTotem",
    name: "Tauren Totem",
    gold: 135,
    lumber: 155,
    buildTime: 70,
    supply: 0,
    dependsOn: ["warMill", "fortress"],
    order: 9,
    units: [],
    upgrades: [
      "spiritWalkeAdeptTraining",
      "spiritWalkerMasterTraining",
      "pulverizeDamageIncrease",
    ],
    image: "orc/taurentotem.png",
  },
  {
    id: "voodooLounge",
    name: "Voodoo Lounge",
    gold: 130,
    lumber: 30,
    buildTime: 60,
    supply: 0,
    dependsOn: [],
    order: 10,
    units: [],
    upgrades: [],
    image: "orc/voodoolounge.png",
  },
  {
    id: "warMill",
    name: "War Mill",
    gold: 205,
    lumber: 0,
    buildTime: 70,
    supply: 0,
    dependsOn: [],
    order: 3,
    units: [],
    upgrades: [
      "spikedBarricades",
      "improvedSpikedBarricades",
      "reinforcedDefenses",
      "steelMeleeWeapons",
      "thoriumMeleeWeapons",
      "arcaniteMeleeWeapons",
      "steelRangedWeapons",
      "thoriumRangedWeapons",
      "arcaniteRangedWeapons",
    ],
    image: "orc/warmill.png",
  },
  {
    id: "watchTower",
    name: "Watch Tower",
    gold: 110,
    lumber: 80,
    buildTime: 60,
    supply: 0,
    dependsOn: ["warMill"],
    order: 4,
    units: [],
    upgrades: [],
    image: "orc/watchtower.png",
  },
]
