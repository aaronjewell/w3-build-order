<template>
  <div class="buildings">
    <h2>Buildings</h2>
    <ul class="buildings__list">
      <li v-for="building in completedBuildings" v-bind:key="building._id">
        <complete-building
          :building="building"
          :available-units="availableUnitsFn(building)"
          :race="race"
          :train-fn="trainFn"
        ></complete-building>
      </li>
    </ul>
  </div>
</template>

<script>
import CompleteBuilding from "./CompleteBuilding.vue";

export default {
  name: "CompletedBuildings",
  components: {
    CompleteBuilding,
  },
  props: {
    completedBuildings: {
      required: true,
    },
    availableUnitsFn: {
      required: true,
    },
    trainFn: {
        required: true
    },
    race: {
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
