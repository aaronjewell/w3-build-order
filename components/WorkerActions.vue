<template>
  <div class="w3bo-worker-actions w3bo-fade-in-quick">
    <div
      class="w3bo-worker-actions__actions unit__actions--all-actions"
      v-if="miner || harvester || buildingActions.length"
    >
      <button
        :style="{
          'grid-row': row(building),
          'grid-column': column(building),
          opacity: 0.3,
        }"
        disabled
        v-for="building in allBuildings"
        :key="building.id"
        class="w3bo-worker-actions__action-button"
        :title="`${building.name}`"
      >
        <img
          class="w3bo-worker-actions__action-image"
          :src="`images/${building.image}`"
        />
      </button>
    </div>
    <div
      class="w3bo-worker-actions__actions w3bo-worker-actions__actions--available"
      v-if="miner || harvester || buildingActions.length"
      style="z-index: 1"
    >
      <button
        :style="{
          'grid-row': row(building),
          'grid-column': column(building),
        }"
        v-for="building in buildableBuildings"
        :key="building.id"
        @click.prevent="build(building, unit)"
        class="w3bo-worker-actions__action-button"
        :title="`${building.name}`"
      >
        <img
          class="w3bo-worker-actions__action-image"
          :src="`images/${building.image}`"
        />
      </button>
      <button
        :style="{
          'grid-row': row({ order: 11 }),
          'grid-column': column({ order: 11 }),
        }"
        class="w3bo-worker-actions__action-button"
        v-if="miner"
        @click.prevent="assignToGold(unit)"
      >
        <img
          class="w3bo-worker-actions__action-image"
          :src="`images/common/chestofgold.png`"
        />
      </button>
      <button
        :style="{
          'grid-row': row({ order: 12 }),
          'grid-column': column({ order: 12 }),
        }"
        class="w3bo-worker-actions__action-button"
        v-if="harvester"
        @click.prevent="assignToLumber(unit)"
      >
        <img
          class="w3bo-worker-actions__action-image"
          :src="`images/common/lumber.png`"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkerActions",
  props: {
    assignToGoldFn: {
      required: true,
    },
    assignToLumberFn: {
      required: true,
    },
    buildFn: {
      required: true,
    },
    allBuildings: {
      required: true,
    },
    buildableBuildings: {
      required: true,
    },
    unit: {
      required: true,
    },
  },
  computed: {
    buildingActions() {
      return this.availableBuildings
    },
    miner() {
      return this.unit.canMine
    },
    harvester() {
      return this.unit.canHarvest
    },
    builder() {
      return this.unit.canBuild
    },
  },
  methods: {
    row(building) {
      return Math.floor((building.order - 1) / 4) + 1
    },
    column(building) {
      return ((building.order - 1) % 4) + 1
    },
    build(buildingData, unit) {
      this.$emit("action")
      return this.buildFn(buildingData, unit)
    },
    assignToGold(unit) {
      this.$emit("action")
      return this.assignToGoldFn(unit)
    },
    assignToLumber(unit) {
      this.$emit("action")
      return this.assignToLumberFn(unit)
    },
  },
}
</script>
