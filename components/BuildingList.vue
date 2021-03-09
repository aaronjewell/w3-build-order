<template>
  <div class="buildings">
    <ul class="d-flex flex-wrap list-unstyled position-relative">
      <li
        class="buildings__item position-relative"
        v-for="building in sortedCompletedBuildings"
        :key="building._id"
        :class="{ selected: isSelected(building) }"
      >
        <div
          class="building position-absolute fade-in-disabled"
          style="top: 0; left: 0;"
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
          class="building fade-in position-relative"
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
      <li
        v-for="inprogress in inprogressBuildings"
        :key="inprogress.inprogressId"
        class="buildings__item position-relative"
      >
        <div class="building fade-in-disabled">
          <div class="building__display">
            <img
              class="building__image"
              :src="`images/${inprogress.unit.image}`"
              :alt="inprogress.unit.name"
            />
          </div>
        </div>
        <span
          :style="{
            right: `${((inprogress.end - inprogress.current) /
              (inprogress.end - inprogress.start)) *
              100}%`,
            transition: 'right 200ms ease-in-out',
          }"
          class="building__progress-bar"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BuildingList",
  props: {
    buildings: {
      required: true,
    },
    completedBuildings: {
      required: true,
    },
    inprogressBuildings: {
      default: () => [],
    },
    selected: {
      required: true,
    },
  },
  computed: {
    sortedCompletedBuildings() {
      return this.completedBuildings.sort((a, b) => a._id - b._id)
    },
  },
  methods: {
    availableBuilding(completed) {
      return (
        this.buildings.find(b => b._id === completed._id) ||
        typeof completed.buildTime === "undefined"
      )
    },
    isSelected(building) {
      return (
        this.selected &&
        this.selected.type === building.type &&
        this.selected.id === building.id &&
        this.selected._id === building._id
      )
    },
  },
}
</script>

<style scoped lang="scss">
$size: 48px;

.buildings {
  &__item {
    z-index: 0;
    &.selected {
      box-shadow: 0 0 8px 2px hsl(0, 0%, 90%);
      z-index: 1;
    }
  }
}

.building {
  &__image {
    width: $size;
    height: $size;
  }

  &__progress-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    background-color: yellow;
  }
}
</style>
