<template>
  <div class="building">
    <img :src="`/images/${race.id}/${building.image}`" :alt="building.name" />
    <div class="building__units">
      <button
        v-for="unit in availableUnits"
        v-bind:key="unit.id"
        @click.prevent="trainFn(unit, building)"
        class="building__unit-button"
        :title="`Train ${unit.name}`"
      >
        <img :src="`/images/${race.id}/${unit.image}`" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompleteBuilding",
  props: {
    building: {
      required: true,
    },
    availableUnits: {
      required: true,
    },
    race: {
      require: true,
    },
    trainFn: {
        require: true
    }
  },
};
</script>

<style lang="scss">
.building {
  display: flex;

  &__unit-button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: 0;
    outline: 0;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
