<template>
  <div class="resource-display d-flex text-light py-2">
    <span class="mr-auto d-flex justify-center"
      ><i class="far fa-clock"></i>&nbsp;{{ formatTime(gameTime) }}</span
    >
    <span
      ><img class="resource-display__icon" src="images/common/icongold.gif" />{{
        ` ${gold}`
      }}</span
    >
    <span
      ><img
        class="resource-display__icon"
        src="images/common/iconlumber.gif"
      />{{ ` ${lumber}` }}</span
    >
    <span
      ><img
        class="resource-display__icon"
        src="images/common/iconsupply.gif"
      />{{ ` ${supplyUsed}/${supplyTotal}` }}</span
    >
  </div>
</template>

<script>
import { formatTime } from "../utils/time"

export default {
  name: "ResourceDisplay",
  props: {
    gold: {
      default: 0,
    },
    lumber: {
      default: 0,
    },
    supplyUsed: {
      default: 0,
    },
    supplyTotal: {
      default: 0,
    },
    gameTime: {
      default: 0,
    },
  },
  methods: {
    formatTime,
  },
}
</script>

<style lang="scss">
.resource-display {
  align-items: center;

  & > * {
    display: flex;
    align-items: center;
    font-size: 0.875rem;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  &__icon {
    margin-right: 8px;
  }
}
</style>
