<template>
  <div class="p-4 pb-5 d-flex align-items-center">
    <button :disabled="tick <= 0" @click.prevent="changeTickFn(tick - 1)">
      &laquo;
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
      &raquo;
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
  data: () => ({
    marks: val =>
      val % 60 === 0
        ? {
            label: `${val / 60}m`,
          }
        : false,
  }),
  methods: {
    tooltipFormatter(val) {
      return formatTime(val)
    },
  },
}
</script>

<style lang="scss"></style>
