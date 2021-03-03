<template>
  <div class="container bg-dark text-light">
    <div class="row">
      <div class="col">
        <resource-display
          :gold="buildOrder.gold"
          :lumber="buildOrder.lumber"
          :supply-used="buildOrder.totalSupply - buildOrder.supply"
          :supply-total="buildOrder.totalSupply"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <completed-buildings
          :race="race"
          :completed-buildings="buildOrder.completedBuildings"/>
      </div>
      <div class="col">
        <h2>Units</h2>
        <unit-list
          :build-fn="build"
          :units="buildOrder.units"
          :race="race"
          :available-buildings="buildOrder.availableBuildings"
          :assign-to-gold-fn="assignToGold"
          :assign-to-lumber-fn="assignToLumber"
        />
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <h2>Worker Actions</h2>
            <worker-actions
              :build-fn="build"
              :units="buildOrder.units"
              :race="race"
              :available-buildings="buildOrder.availableBuildings"
              :assign-to-gold-fn="assignToGold"
              :assign-to-lumber-fn="assignToLumber"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
              <h2>Train</h2>
            <train-actions
              :train-fn="train"
              :race="race"
              :buildings="buildOrder.buildings"
              :available-units="buildOrder.availableUnits"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Game Time</h2>
        <input
          style="width: 100%;"
          @input="onTickChange"
          type="range"
          id="ticks"
          name="ticks"
          min="0"
          max="200"
          :value="tick"
        />
        <span>{{ tick }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Plans</h2>
        <action-list
          style="flex: 1 1 50%;"
          :remove-action-fn="removeAction"
          :change-tick-fn="changeTick"
          :actions="buildOrder.actions"
        ></action-list>
      </div>
    </div>
  </div>
</template>

<script>
import "../variables.scss";
import "bootstrap/scss/bootstrap.scss";

import BuildOrder from "../lib/BuildOrder.js";
import Orc from "../lib/Orc.js";

import ActionList from "./ActionList.vue";
import CompletedBuildings from "./CompletedBuildings.vue";
import ResourceDisplay from "./ResourceDisplay.vue";
import UnitList from "./UnitList.vue";
import TrainActions from "./TrainActions.vue";
import WorkerActions from "./WorkerActions.vue";

export default {
  name: "App",
  components: {
    ActionList,
    CompletedBuildings,
    ResourceDisplay,
    UnitList,
    TrainActions,
    WorkerActions,
  },
  data: () => ({
    race: null,
    buildOrder: null,
  }),
  created() {
    this.race = Orc;
    this.buildOrder = new BuildOrder(this.race);
  },
  computed: {
    tick: {
      get: function() {
        return this.buildOrder.tick;
      },
      set: function(value) {
        this.buildOrder.tick = value;
      },
    },
  },
  methods: {
    changeTick(value) {
      this.tick = Number(value);
    },
    onTickChange(event) {
      this.tick = Number(event.target.value);
    },
    build(building, worker) {
      this.buildOrder.build(building, worker);
    },
    train(unit, building) {
      this.buildOrder.train(unit, building);
    },
    assignToGold(worker) {
      this.buildOrder.assignToGold(worker);
    },
    assignToLumber(worker) {
      this.buildOrder.assignToLumber(worker);
    },
    removeAction(action) {
      this.buildOrder.removeAction(action);
    },
  },
};
</script>
