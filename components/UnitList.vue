<template>
  <div>
    <ul class="d-flex list-unstyled">
      <li
        class="position-relative"
        v-for="unit in completedUnits"
        :key="unit._id"
      >
        <div
          class="unit position-absolute"
          style="top: 0; left: 0; opacity: 0.5;"
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
  },
  data: () => ({
    selected: null,
  }),
  methods: {
    availableUnit(completed) {
      return this.units.find(u => u._id === completed._id)
    },
  },
}
</script>

<style lang="scss">
.unit {
  &__image {
    height: 32px;
    width: 32px;
  }
}
</style>
