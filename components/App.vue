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
        <div class="row">
          <div class="col">
            <h2>Upgrades</h2>
            <completed-upgrades :completed-upgrades="buildOrder.upgrades" />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <h2>Buildings</h2>
            <building-list
              @selected="building => (selected = building)"
              :completed-buildings="buildOrder.completedBuildings"
              :buildings="buildOrder.buildings"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h2>Units</h2>
            <unit-list
              @selected="unit => (selected = unit)"
              :units="buildOrder.units"
              :completed-units="buildOrder.completedUnits"
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <worker-actions
              v-if="selected && selected.canBuild"
              :build-fn="build"
              :unit="selected"
              :all-buildings="buildOrder.allBuildings"
              :available-buildings="buildOrder.availableBuildings"
              :assign-to-gold-fn="assignToGold"
              :assign-to-lumber-fn="assignToLumber"
              @action="() => (selected = null)"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <building-actions
              v-if="availableUnitsToBuild || availableUpgradesToResearch"
              :building="selected"
              :train-fn="train"
              :upgrade-fn="upgrade"
              @action="() => (selected = null)"
              :all-actions="buildOrder.allBuildingActions"
              :available-actions="[
                ...availableUnitsToBuild,
                ...availableUpgradesToResearch,
              ]"
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
          max="600"
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
import "../variables.scss"
import "bootstrap/scss/bootstrap.scss"

import BuildOrder from "../lib/BuildOrder"
import Orc from "../lib/Orc"

import ActionList from "./ActionList.vue"
import BuildingList from "./BuildingList.vue"
import CompletedUpgrades from "./CompletedUpgrades.vue"
import ResourceDisplay from "./ResourceDisplay.vue"
import BuildingActions from "./BuildingActions.vue"
import UnitList from "./UnitList.vue"
import UpgradeList from "./UpgradeList.vue"
import WorkerActions from "./WorkerActions.vue"

export default {
  name: "App",
  components: {
    ActionList,
    BuildingActions,
    BuildingList,
    CompletedUpgrades,
    ResourceDisplay,
    UnitList,
    UpgradeList,
    WorkerActions,
  },
  data: () => ({
    race: null,
    buildOrder: null,
    selected: null,
  }),
  created() {
    this.race = Orc
    this.buildOrder = new BuildOrder(this.race)
  },
  computed: {
    tick: {
      get: function() {
        return this.buildOrder.tick
      },
      set: function(value) {
        this.buildOrder.tick = value
      },
    },
    availableUnitsToBuild() {
      return (
        this.selected &&
        this.selected.type &&
        this.selected.type === "building" &&
        this.buildOrder.availableUnitsForBuilding(this.selected)
      )
    },
    availableUpgradesToResearch() {
      return (
        this.selected &&
        this.selected.type &&
        this.selected.type === "building" &&
        this.buildOrder.availableUpgradesForBuilding(this.selected)
      )
    },
    allBuildingActions() {
      this.selected &&
        this.selected.type &&
        this.selected.type === "building" &&
        this.buildOrder.allBuildingActions(this.selected)
    },
  },
  methods: {
    changeTick(value) {
      this.tick = Number(value)
    },
    onTickChange(event) {
      this.tick = Number(event.target.value)
    },
    build(building, worker) {
      this.buildOrder.build(building, worker)
    },
    train(unit, building) {
      this.buildOrder.train(unit, building)
    },
    upgrade(upgrade, building) {
      this.buildOrder.upgrade(upgrade, building)
    },
    assignToGold(worker) {
      this.buildOrder.assignToGold(worker)
    },
    assignToLumber(worker) {
      this.buildOrder.assignToLumber(worker)
    },
    removeAction(action) {
      this.buildOrder.removeAction(action)
    },
  },
}
</script>
