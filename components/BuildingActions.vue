<template>
  <div class="training fade-in-quick">
    <div class="training__units d-flex flex-wrap">
      <button
        v-for="action in availableActions"
        :key="action.id"
        @click.prevent="doAction(action, building)"
        class="training__button"
        :title="`Train ${action.name}`"
      >
        <img class="training__unit-image" :src="`images/${action.image}`" />
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
      required: true,
    },
    buyFn: {
      required: true,
    },
    trainFn: {
      required: true,
    },
    upgradeFn: {
      required: true,
    },
  },
  methods: {
    doAction(entity) {
      this.$emit("action")
      switch (entity.type) {
        case "unit":
          return this.trainFn(entity, this.building)
        case "upgrade":
          return this.upgradeFn(entity, this.building)
        case "item":
          return this.buyFn(entity, this.building)
      }
    },
  },
}
</script>

<style lang="scss">
$size: 48px;

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
