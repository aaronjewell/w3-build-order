<template>
  <div class="w3bo-resource-display">
    <div class="w3bo-resource-display__timer">
      <span class="w3bo-resource-display__timer-time"
        ><i class="far fa-clock"></i>&nbsp;<span>{{
          formatTime(gameTime)
        }}</span></span
      >
      <span
        :class="{ 'text-success': isPlaying }"
        @click="playFn"
        class="w3bo-resource-display__timer-play"
        ><i class="far fa-play-circle"></i
      ></span>
      <span @click="stopFn" class="w3bo-resource-display__timer-stop"
        ><i class="far fa-stop-circle"></i
      ></span>
    </div>
    <div class="w3bo-resource-display__miners">
      Miners: {{ miningWorkers.length || 0
      }}<button
        @click.prevent="removeMinerFn"
        v-if="miningWorkers.length"
        class="w3bo-resource-display__remove-worker w3bo-btn w3bo-btn--sm w3bo-btn--outline-secondary"
      >
        Remove
      </button>
    </div>
    <div class="w3bo-resource-display__harvesters">
      Harvesters: {{ harvestingWorkers.length || 0
      }}<button
        @click.prevent="removeHarvesterFn"
        v-if="harvestingWorkers.length"
        class="w3bo-resource-display__remove-worker w3bo-btn w3bo-btn--sm w3bo-btn--outline-secondary"
      >
        Remove
      </button>
    </div>
    <div>
      <img
        class="w3bo-resource-display__icon"
        src="images/common/icongold.gif"
      />{{ ` ${gold}` }}
    </div>
    <div>
      <img
        class="w3bo-resource-display__icon"
        src="images/common/iconlumber.gif"
      />{{ ` ${lumber}` }}
    </div>
    <div>
      <img
        class="w3bo-resource-display__icon"
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
    removeMinerFn: {
      required: true,
    },
    removeHarvesterFn: {
      required: true,
    },
  },
  methods: {
    formatTime,
  },
}
</script>
