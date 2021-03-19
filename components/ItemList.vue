<template>
  <div class="w3bo-items">
    <ul class="w3bo-items__list w3bo-list-unstyled">
      <li v-for="item in purchasedItems" v-bind:key="item._id">
        <img
          class="w3bo-items__image"
          :src="getImgUrl(item.image)"
          :alt="item.name"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { getImgUrl } from "../utils/images"

export default {
  name: "ItemList",
  props: {
    purchasedItems: {
      required: true,
    },
  },
  methods: {
    getImgUrl,
  },
}
</script>
