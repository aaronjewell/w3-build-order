<template>
  <div class="position-relative fade-in-quick d-inline-block">
    <div
      class="unit__actions position-absolute unit__actions--all-actions"
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
        class="unit__action-button"
        :title="`${building.name}`"
      >
        <img class="unit__action-image" :src="`images/${building.image}`" />
      </button>
    </div>
    <div
      class="unit__actions position-relative"
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
        class="unit__action-button"
        :title="`${building.name}`"
      >
        <img class="unit__action-image" :src="`images/${building.image}`" />
      </button>
      <button
        :style="{
          'grid-row': row({ order: 11 }),
          'grid-column': column({ order: 11 }),
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
          'grid-row': row({ order: 12 }),
          'grid-column': column({ order: 12 }),
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

<style scoped lang="scss">
$size: 48px;

.unit {
  &__image {
    height: $size;
    width: $size;
  }

  &__actions {
    display: grid;
    grid-template-columns: $size $size $size $size;
    grid-template-rows: $size $size $size;
    grid-gap: 4px;
    padding: 4px;
    border-radius: 8px;
    border: 6px solid hsl(0, 0%, 12%);
    position: relative;

    &--all-actions {
      background-color: hsl(0, 0%, 16%);
      box-shadow: 2px 2px 8px -2px hsl(0deg 0% 5%);
    }
  }

  &__action-button {
    margin: 0;
    padding: 0;
    height: $size;
    width: $size;
    transition: box-shadow 200ms ease-in-out, transform 200ms ease-in-out;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      transform: translateX(-1px) translateY(-1px);
      box-shadow: 2px 2px 8px -4px hsl(0, 0%, 75%);
    }
  }

  &__action-image {
    width: $size;
    height: $size;
  }
}
</style>
