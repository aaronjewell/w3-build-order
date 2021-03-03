<template>
  <div class="container bg-dark text-light">
    <div class="row">
      <div class="col">
        <resource-display
          :gold="state.gold"
          :lumber="state.lumber"
          :supply-used="state.totalSupply - state.supply"
          :supply-total="state.totalSupply"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <completed-buildings
          :race="race"
          :completed-buildings="state.completedBuildings"/>
      </div>
      <div class="col">
        <h2>Units</h2>
        <unit-list
          :build-fn="build"
          :units="state.units"
          :race="race"
          :available-buildings="state.availableBuildings"
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
              :units="state.units"
              :race="race"
              :available-buildings="state.availableBuildings"
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
              :buildings="state.buildings"
              :available-units="state.availableUnits"
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
          :actions="state.actions"
        ></action-list>
      </div>
    </div>
  </div>
</template>

<script>
import "../variables.scss";
import "bootstrap/scss/bootstrap.scss";

import State from "../lib/State.js";
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
    state: null,
  }),
  created() {
    this.race = Orc;
    this.state = new State(this.race);
  },
  computed: {
    tick: {
      get: function() {
        return this.state.tick;
      },
      set: function(value) {
        this.state.tick = value;
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
      this.state.build(building, worker);
    },
    train(unit, building) {
      this.state.train(unit, building);
    },
    assignToGold(worker) {
      this.state.assignToGold(worker);
    },
    assignToLumber(worker) {
      this.state.assignToLumber(worker);
    },
    removeAction(action) {
      this.state.removeAction(action);
    },
  },
};
</script>

<style lang="scss"></style>
