export default [
    {
        id: "peon",
        name: "Peon",
        type: "Worker",
        gold: 75,
        lumber: 0,
        food: 1,
        buildTime: 15,
        startQty: 5,
        states: ["mining", "harvesting", "building", "attacking"],
        activeStates: []
    }
]