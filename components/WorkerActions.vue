<template>
  <div>
    <div
      class="unit__actions"
      v-if="miner || harvester || buildingActions.length"
    >
      <button
        :style="{
          top: topOffset(building) + 'px',
          left: leftOffset(building) + 'px',
        }"
        v-for="building in availableBuildings"
        :key="building.id"
        @click.prevent="build(building, unit)"
        class="unit__action-button"
        :title="`${building.name}`"
      >
        <img class="unit__action-image" :src="`images/${building.image}`" />
      </button>
      <button
        :style="{
          top: topOffset({ order: 11 }) + 'px',
          left: leftOffset({ order: 11 }) + 'px',
        }"
        class="unit__action-button"
        v-if="miner"
        @click.prevent="assignToGold(unit)"
      >
        <img
          class="unit__action-image"
          :src="`images/common/chestofgold.png`"
        />
      </button>
      <button
        :style="{
          top: topOffset({ order: 12 }) + 'px',
          left: leftOffset({ order: 12 }) + 'px',
        }"
        class="unit__action-button"
        v-if="harvester"
        @click.prevent="assignToLumber(unit)"
      >
        <img class="unit__action-image" :src="`images/common/lumber.png`" />
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
    availableBuildings: {
      required: true,
    },
    buildFn: {
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
    topOffset(building) {
      return Math.floor((building.order - 1) / 4) * 32
    },
    leftOffset(building) {
      return ((building.order - 1) % 4) * 32
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

<style lang="scss">
.unit {
  display: flex;

  &__image {
    height: 32px;
    width: 32px;
  }

  &__actions {
    position: relative;
    width: 128px;
    height: 96px;
  }

  &__action-button {
    margin: 0;
    padding: 0;
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 32px;
    width: 32px;
    background-color: black;
    color: white;
  }

  &__action-image {
    width: 32px;
    height: 32px;
  }
}
</style>
