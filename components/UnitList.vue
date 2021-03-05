<template>
  <div>
    <ul class="units d-flex list-unstyled position-relative">
      <li
        class="units__item position-relative"
        v-for="unit in completedUnits"
        :key="unit._id"
        :class="{ selected: isSelected(unit) }"
      >
        <div
          class="unit position-absolute"
          style="top: 0; left: 0; opacity: 0.3;"
        >
          <div class="unit__display">
            <img
              class="unit__image"
              :src="`images/${unit.image}`"
              :alt="unit.name"
            />
          </div>
        </div>
        <div
          class="unit position-relative"
          style="z-index: 1;"
          :style="{ visibility: availableUnit(unit) ? 'visible' : 'hidden' }"
          @click="() => $emit('selected', unit)"
        >
          <div class="unit__display">
            <img
              class="unit__image"
              :src="`images/${unit.image}`"
              :alt="unit.name"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UnitList",
  props: {
    units: {
      required: true,
    },
    completedUnits: {
      required: true,
    },
    selected: {
      required: true,
    },
  },
  methods: {
    availableUnit(completed) {
      return this.units.find(u => u._id === completed._id)
    },
    isSelected(unit) {
      return (
        this.selected &&
        this.selected.type === unit.type &&
        this.selected._id === unit._id
      )
    },
  },
}
</script>

<style scoped lang="scss">
$size: 64px;

.units {
  &__item {
    z-index: 0;
    &.selected {
      box-shadow: 0 0 0 2px yellow;
      z-index: 1;
    }
  }
}
.unit {
  &__image {
    height: $size;
    width: $size;
  }
}
</style>
