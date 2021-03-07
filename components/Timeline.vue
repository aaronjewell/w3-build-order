<template>
  <div class="p-4 pb-5 d-flex align-items-center">
    <button :disabled="tick <= 0" @click.prevent="changeTickFn(tick - 1)">
      <i class="fas fa-step-backward"></i>
    </button>
    <div class="w-100 px-3">
      <vue-slider
        @change="changeTickFn"
        :marks="marks"
        :value="tick"
        :max="max"
        :contained="true"
        :tooltip-formatter="tooltipFormatter"
      ></vue-slider>
    </div>
    <button :disabled="tick >= max" @click.prevent="changeTickFn(tick + 1)">
      <i class="fas fa-step-forward"></i>
    </button>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component"
import "vue-slider-component/theme/default.css"

import { formatTime } from "../utils/time"

export default {
  name: "Timeline",
  components: {
    VueSlider,
  },
  props: {
    max: {
      type: Number,
      default: 600,
    },
    actions: {
      required: true,
    },
    changeTickFn: {
      required: true,
    },
    tick: {
      required: true,
    },
  },
  methods: {
    tooltipFormatter(val) {
      return formatTime(val)
    },
    marks(val) {
      if (val % 60 === 0) {
        return {
          label: `${val / 60}m`,
        }
      }
      return false
    },
  },
}
</script>

<style lang="scss"></style>
