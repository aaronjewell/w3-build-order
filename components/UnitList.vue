<template>
  <div>
    <ul class="d-flex list-unstyled">
      <li v-for="unit in units" :key="unit._id">
        <div class="unit">
          <div class="unit__display">
            <img
              class="unit__image"
              :src="`/images/${unit.image}`"
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
    availableBuildings: {
      required: true,
    },
    units: {
      required: true,
    },
    buildFn: {
      required: true,
    },
    assignToGoldFn: {
      required: true,
    },
    assignToLumberFn: {
      required: true,
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
    position: absolute;
    top: 0;
    left: 0;
    height: 32px;
    width: 32px;
    font-size: 0.5rem;
    background-color: black;
    color: white;
  }

  &__action-image {
    width: 32px;
    height: 32px;
  }
}
</style>
