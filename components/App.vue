<template>
  <div class="w3bo-container">
    <section class="w3bo-card">
      <div
        class="w3bo-container w3bo-bg-contrast-higher w3bo-fg-contrast-higher"
      >
        <div class="w3bo-row">
          <div class="w3bo-col">
            <resource-display
              :gold="buildOrder.gold"
              :lumber="buildOrder.lumber"
              :supply-used="buildOrder.totalSupply - buildOrder.supply"
              :supply-total="buildOrder.totalSupply"
              :miningWorkers="buildOrder.miningWorkers"
              :harvestingWorkers="buildOrder.harvestingWorkers"
              :game-time="tick"
              :play-fn="play"
              :stop-fn="stop"
              :is-playing="isPlaying"
              :remove-miner-fn="removeFromGold"
              :remove-harvester-fn="removeFromLumber"
            />
          </div>
        </div>
      </div>
      <div class="w3bo-container w3bo-bg-contrast-high w3bo-fg-contrast-high">
        <div class="w3bo-row">
          <div class="w3bo-col">
            <timeline
              :actions="buildOrder.actions"
              :tick="tick"
              :change-tick-fn="changeTick"
            />
          </div>
        </div>
        <div class="w3bo-row">
          <div class="w3bo-col-6">
            <div class="w3bo-row">
              <div class="w3bo-col-6">
                <div class="w3bo-row">
                  <div class="w3bo-col">
                    <section class="w3bo-section">
                      <h2 class="w3bo-section-heading">Buildings</h2>
                      <building-list
                        @selected="building => (selected = building)"
                        :selected="selected"
                        :buildings="buildOrder.buildings"
                        :inprogress-buildings="buildOrder.inprogressBuildings"
                        :completed-buildings="buildOrder.completedBuildings"
                      />
                    </section>
                  </div>
                </div>
                <div class="w3bo-row">
                  <div class="w3bo-col">
                    <section class="w3bo-section">
                      <h2 class="w3bo-section-heading">Units</h2>
                      <unit-list
                        @selected="unit => (selected = unit)"
                        :selected="selected"
                        :units="buildOrder.units"
                        :inprogress-units="buildOrder.inprogressUnits"
                        :completed-units="buildOrder.completedUnits"
                      />
                    </section>
                  </div>
                </div>
                <div class="w3bo-row">
                  <div class="w3bo-col">
                    <section class="w3bo-section">
                      <h2 class="w3bo-section-heading">Upgrades</h2>
                      <upgrade-list
                        :completed-upgrades="buildOrder.completedUpgrades"
                      />
                    </section>
                  </div>
                </div>
                <div class="w3bo-row">
                  <div class="w3bo-col">
                    <section class="w3bo-section">
                      <h2 class="w3bo-section-heading">Items</h2>
                      <item-list :purchased-items="buildOrder.purchasedItems" />
                    </section>
                  </div>
                </div>
                <div class="w3bo-row">
                  <div class="w3bo-col">
                    <section class="w3bo-section">
                      <h2 class="w3bo-section-heading">Neutral Buildings</h2>
                      <building-list
                        @selected="building => (selected = building)"
                        :selected="selected"
                        :buildings="buildOrder.neutralBuildings"
                        :completed-buildings="buildOrder.neutralBuildings"
                      />
                    </section>
                  </div>
                </div>
              </div>
              <div class="w3bo-col-6">
                <div class="w3bo-row">
                  <div class="w3bo-col">
                    <worker-actions
                      v-if="selected && selected.canBuild"
                      :build-fn="build"
                      :unit="selected"
                      :all-buildings="buildOrder.allBuildings"
                      :buildable-buildings="buildOrder.availableBuildings()"
                      :assign-to-gold-fn="assignToGold"
                      :assign-to-lumber-fn="assignToLumber"
                      @action="() => (selected = null)"
                    />
                  </div>
                </div>
                <div class="w3bo-row">
                  <div class="w3bo-col">
                    <building-actions
                      v-if="
                        availableUnitsToBuild ||
                          availableUpgradesToResearch ||
                          availableItemsToBuy
                      "
                      :building="selected"
                      :buy-fn="buy"
                      :train-fn="train"
                      :upgrade-fn="upgrade"
                      @action="() => (selected = null)"
                      :all-actions="buildOrder.allBuildingActions(selected)"
                      :available-actions="[
                        ...availableItemsToBuy,
                        ...availableUnitsToBuild,
                        ...availableUpgradesToResearch,
                      ]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w3bo-col-6">
            <section>
              <h2 class="w3bo-section-heading">Plans</h2>
              <action-list
                :remove-action-fn="removeAction"
                :change-tick-fn="changeTick"
                :actions="buildOrder.actions"
              ></action-list>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BuildOrder from "../lib/BuildOrder"
import Orc from "../lib/Orc"

import ActionList from "./ActionList.vue"
import BuildingActions from "./BuildingActions.vue"
import BuildingList from "./BuildingList.vue"
import ItemList from "./ItemList.vue"
import ResourceDisplay from "./ResourceDisplay.vue"
import Timeline from "./Timeline.vue"
import UnitList from "./UnitList.vue"
import UpgradeList from "./UpgradeList.vue"
import WorkerActions from "./WorkerActions.vue"

export default {
  name: "App",
  components: {
    ActionList,
    BuildingActions,
    BuildingList,
    ItemList,
    ResourceDisplay,
    Timeline,
    UnitList,
    UpgradeList,
    WorkerActions,
  },
  data: () => ({
    race: null,
    buildOrder: null,
    selected: null,
    playInterval: null,
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
    availableItemsToBuy() {
      return (
        this.selected &&
        this.selected.type &&
        this.selected.type === "building" &&
        this.buildOrder.availableItemsForBuilding(this.selected)
      )
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
    isPlaying() {
      return !!this.playInterval
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
    buy(item, building) {
      this.buildOrder.buy(item, building)
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
    removeFromGold() {
      this.buildOrder.removeFromGold()
    },
    assignToLumber(worker) {
      this.buildOrder.assignToLumber(worker)
    },
    removeFromLumber() {
      this.buildOrder.removeFromLumber()
    },
    removeAction(action) {
      this.buildOrder.removeAction(action)
    },
    stop() {
      if (this.playInterval) {
        clearInterval(this.playInterval)
        this.playInterval = null
      }
    },
    play() {
      this.playInterval = setInterval(() => {
        this.tick++
      }, 1000)
    },
  },
}
</script>
