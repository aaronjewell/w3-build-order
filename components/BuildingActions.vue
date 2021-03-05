<template>
  <div class="training">
    <div class="training__units d-flex flex-wrap">
      <button
        v-for="unitOrUpgrade in availableActions"
        :key="unitOrUpgrade.id"
        @click.prevent="doAction(unitOrUpgrade, building)"
        class="training__button"
        :title="`Train ${unitOrUpgrade.name}`"
      >
        <img
          class="training__unit-image"
          :src="`images/${unitOrUpgrade.image}`"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuildingActions",
  props: {
    availableActions: {
      required: true,
    },
    allActions: {
      required: true,
    },
    building: {
      require: true,
    },
    trainFn: {
      require: true,
    },
    upgradeFn: {
      require: true,
    },
  },
  methods: {
    doAction(unitOrUpgrade) {
      this.$emit("action")
      return unitOrUpgrade.type === "unit"
        ? this.trainFn(unitOrUpgrade, this.building)
        : this.upgradeFn(unitOrUpgrade, this.building)
    },
  },
}
</script>

<style lang="scss">
$size: 64px;

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
    height: $size;
    width: $size;
    background-color: black;
    color: white;
  }

  &__unit-image {
    width: $size;
    height: $size;
  }
}
</style>
