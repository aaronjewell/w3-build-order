<template>
  <div style="display:flex;">
    <div style="flex: 1 1 50%">
      <div>
        <h2>Game Time</h2>
        <input
            style="width: 100%;"
          @change="onTickChange"
          type="range"
          id="ticks"
          name="ticks"
          min="0"
          max="200"
          :value="tick"
        />
        <span>{{ tick }}</span>
      </div>
      <div style="display: flex;">
        <div style="margin-right: 32px;">
          <h2>Gold</h2>
          <p>{{ state.gold }}</p>
        </div>
        <div style="margin-right: 32px;">
          <h2>Lumber</h2>
          <p>{{ state.lumber }}</p>
        </div>
        <div>
          <h2>Supply</h2>
          <p>{{ totalSupply - state.supply }} / {{ totalSupply }}</p>
        </div>
      </div>
      <unit-list
        :build-fn="build"
        :units="state.units"
        :race="race"
        :available-buildings="state.availableBuildings"
        :assign-to-gold-fn="assignToGold"
        :assign-to-lumber-fn="assignToLumber"
      ></unit-list>
      <completed-buildings
        :train-fn="train"
        :race="race"
        :completed-buildings="state.buildings"
        :available-units-fn="availableUnits"
      ></completed-buildings>
    </div>
    <action-list
      style="flex: 1 1 50%;"
      :remove-action-fn="removeAction"
      :change-tick-fn="changeTick"
      :actions="state.actions"
    ></action-list>
  </div>
</template>

<script>
import "normalize.css";

import State from "../State.js";
import Orc from "../Orc.js";

import ActionList from "./ActionList.vue";
import CompletedBuildings from "./CompletedBuildings.vue";
import UnitList from "./UnitList.vue";

export default {
  name: "App",
  components: {
    ActionList,
    CompletedBuildings,
    UnitList,
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
    totalSupply() {
        return this.state.actions.reduce((supply, action) => {
            if (action.type === "build" && action.start + action.duration <= this.tick) {
                return supply + action.meta.building.supply;
            }
            return supply;
        }, this.race.startingResources.value.supply);
    }
  },
  methods: {
    changeTick(value) {
        this.tick = Number(value);
    },
    onTickChange(event) {
      this.tick = Number(event.target.value);
    },
    availableUnits(building) {
      return this.state.availableUnits(building);
    },
    build(worker, building) {
      this.state.build(worker, building);
      // hack to force the re-render.
      this.state.tick++;
      this.state.tick--;
    },
    train(unit, building) {
      this.state.train(unit, building);
      // hack to force the re-render.
      this.state.tick++;
      this.state.tick--;
    },
    assignToGold(worker) {
      this.state.assignToGold(worker);
      this.state.tick++;
      this.state.tick--;
    },
    assignToLumber(worker) {
      this.state.assignToLumber(worker);
      this.state.tick++;
      this.state.tick--;
    },
    removeAction(action) {
      this.state.removeAction(action);
      this.state.tick++;
      this.state.tick--;
    },
  },
};
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    html {
        font-size: 16px;
    }

    body {
        line-height: 1.4;
    }

    ul, ol {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    button {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
    }

    img {
        max-width: 100%;
    }
</style>
