<template>
  <div class="buildings">
    <ul class="d-flex list-unstyled position-relative">
      <li
        class="buildings__item position-relative"
        v-for="building in completedBuildings"
        :key="building._id"
        :class="{ selected: isSelected(building) }"
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
    selected: {
      required: true,
    },
  },
  methods: {
    availableBuilding(completed) {
      return this.buildings.find(b => b._id === completed._id)
    },
    isSelected(building) {
      return (
        this.selected &&
        this.selected.type === building.type &&
        this.selected._id === building._id
      )
    },
  },
}
</script>

<style scoped lang="scss">
$size: 64px;

.buildings {
  &__item {
    z-index: 0;
    &.selected {
      box-shadow: 0 0 0 2px yellow;
      z-index: 1;
    }
  }
}

.building {
  &__image {
    width: $size;
    height: $size;
  }
}
</style>
