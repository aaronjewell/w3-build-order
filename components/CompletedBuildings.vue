<template>
  <div class="buildings">
    <ul class="d-flex flex-wrap list-unstyled">
      <li v-for="building in completedBuildings" v-bind:key="building._id">
        <img
          class="buildings__image"
          :src="`images/${building.image}`"
          :alt="building.name"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CompletedBuildings",
  props: {
    completedBuildings: {
      required: true,
    },
  },
}
</script>

<style lang="scss">
.buildings {
  &__image {
    width: 32px;
    height: 32px;
  }
}
</style>
