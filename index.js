import State from "./State.js";
import Orc from "./Orc.js";
import unitTypes from "./unit-types.js";

var app = new Vue({
  el: "#app",
  data: () => ({
    race: null,
    state: null,
    tick: 0,
  }),
  created() {
    this.race = new Orc();
    this.state = new State(this.race);
  },
  computed: {
      stateAtTick() {
          return this.state.atTick(this.tick);
      },
      idleWorkers() {
          return this.stateAtTick.idleWorkers();
      },
      harvestingWorkers() {
          return this.stateAtTick.harvestingWorkers();
      },
      miningWorkers() {
          return this.stateAtTick.miningWorkers();
      },
      availableBuildings() {
          return this.stateAtTick.availableBuildings();
      },
      availableUnits() {
          return this.stateAtTick.availableUnits();
      }
  },
  methods: {
      build(worker, building) {
        this.stateAtTick.addPlan(worker.planBuilding(building, this.tick))
      },
      spawn(building, unit) {
        this.stateAtTick.addPlan(building.planSpawn(unit, this.tick))
      },
      harvest(worker) {
        this.stateAtTick.addPlan(worker.planHarvesting(this.tick));
      },
      mine(worker) {
        this.stateAtTick.addPlan(worker.planMining(this.tick));
      },
      newlyAssigned(unit) {
          return this.stateAtTick.unitAssignedThisTick(unit);
      },
      removePlan(id) {
          this.stateAtTick.removePlan(id);
      }
  }
});
