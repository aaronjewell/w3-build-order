<template>
  <div class="resource-display d-flex text-light py-2">
    <div class="mr-auto d-flex justify-center">
      <span
        ><i class="far fa-clock"></i>&nbsp;<span
          style="font-family: monospace; font-size: 1.125rem"
          >{{ formatTime(gameTime) }}</span
        ></span
      >
      <span
        :class="{ 'text-success': isPlaying }"
        @click="playFn"
        style="font-size: 1.125rem"
        class="ml-3"
        ><i class="far fa-play-circle"></i
      ></span>
      <span @click="stopFn" style="font-size: 1.125rem" class="ml-2"
        ><i class="far fa-stop-circle"></i
      ></span>
    </div>
    <div class="mr-3">Miners: {{ miningWorkers }}</div>
    <div class="mr-5">Harvesters: {{ harvestingWorkers }}</div>
    <div>
      <img class="resource-display__icon" src="images/common/icongold.gif" />{{
        ` ${gold}`
      }}
    </div>
    <div>
      <img
        class="resource-display__icon"
        src="images/common/iconlumber.gif"
      />{{ ` ${lumber}` }}
    </div>
    <div>
      <img
        class="resource-display__icon"
        src="images/common/iconsupply.gif"
      />{{ ` ${supplyUsed}/${supplyTotal}` }}
    </div>
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
    miningWorkers: {
      default: 0,
    },
    harvestingWorkers: {
      default: 0,
    },
    gameTime: {
      default: 0,
    },
    playFn: {
      required: true,
    },
    stopFn: {
      required: true,
    },
    isPlaying: {
      required: true,
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
