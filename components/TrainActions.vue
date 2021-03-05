<template>
<div class="training">
  <div class="training__units d-flex flex-wrap">
    <button
      v-for="unit in availableUnits"
      :key="unit.id"
      @click.prevent="trainFn(unit, buildingForUnit(unit.id))"
      class="training__button"
      :title="`Train ${unit.name}`"
    >
      <img class="training__unit-image" :src="`/images/${unit.image}`" />
    </button>
  </div>
  </div>
</template>

<script>
export default {
  name: "TrainActions",
  props: {
    availableUnits: {
      required: true,
    },
    buildings: {
      required: true,
    },
    trainFn: {
      require: true,
    },
  },
  methods: {
    buildingForUnit(unitId) {
      return this.buildings.find((b) => b.units.includes(unitId));
    }
  },
};
</script>

<style lang="scss">
.training {
  display: flex;

  &__units {
    position: relative;
  }

  &__button {
    margin: 0;
    padding: 0;
    border: 0;
    top: 0;
    left: 0;
    height: 32px;
    width: 32px;
    background-color: black;
    color: white;
  }

  &__unit-image {
    width: 32px;
    height: 32px;
  }
}
</style>
