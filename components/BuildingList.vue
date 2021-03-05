<template>
  <div class="buildings">
    <ul class="d-flex list-unstyled">
      <li
        class="position-relative"
        v-for="building in completedBuildings"
        :key="building._id"
      >
        <div
          class="building position-absolute"
          style="top: 0; left: 0; opacity: 0.5;"
        >
          <div class="building__display">
            <img
              class="building__image"
              :src="`images/${building.image}`"
              :alt="building.name"
            />
          </div>
        </div>
        <div
          class="building position-relative"
          style="z-index: 1;"
          :style="{
            visibility: availableBuilding(building) ? 'visible' : 'hidden',
          }"
          @click="() => $emit('selected', building)"
        >
          <div class="building__display">
            <img
              class="building__image"
              :src="`images/${building.image}`"
              :alt="building.name"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BuildingList",
  props: {
    completedBuildings: {
      required: true,
    },
    buildings: {
      required: true,
    },
  },
  methods: {
    availableBuilding(completed) {
      return this.buildings.find(b => b._id === completed._id)
    },
  },
}
</script>

<style lang="scss">
.building {
  &__image {
    width: 32px;
    height: 32px;
  }
}
</style>
