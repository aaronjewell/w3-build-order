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
        @click.prevent="buildFn(building, builder)"
        class="unit__action-button"
        :title="`${building.name}`"
      >
        <img
          class="unit__action-image"
          :src="`/images/${race.id}/${building.image}`"
        />
      </button>
      <button
        :style="{
          top: topOffset({ order: 11 }) + 'px',
          left: leftOffset({ order: 11 }) + 'px',
        }"
        class="unit__action-button"
        v-if="miner"
        @click.prevent="assignToGoldFn(miner)"
      >
        <img
          class="unit__action-image"
          :src="`/images/common/chestofgold.png`"
        />
      </button>
      <button
        :style="{
          top: topOffset({ order: 12 }) + 'px',
          left: leftOffset({ order: 12 }) + 'px',
        }"
        class="unit__action-button"
        v-if="harvester"
        @click.prevent="assignToLumberFn(harvester)"
      >
        <img class="unit__action-image" :src="`/images/common/lumber.png`" />
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
    race: {
      required: true,
    },
    units: {
      required: true,
    },
  },
  computed: {
    buildingActions() {
      return this.availableBuildings.filter((action) =>
        this.units.some((unit) => unit.canBuild)
      );
    },
    miner() {
      return this.units.find((unit) => unit.canMine);
    },
    harvester() {
      return this.units.find((unit) => unit.canHarvest);
    },
    builder() {
      return this.units.find((unit) => unit.canBuild);
    },
  },
  methods: {
    topOffset(building) {
      return Math.floor((building.order - 1) / 4) * 32;
    },
    leftOffset(building) {
      return ((building.order - 1) % 4) * 32;
    },
  },
};
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
