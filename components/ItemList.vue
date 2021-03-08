<template>
  <div class="items">
    <ul class="d-flex flex-wrap list-unstyled">
      <li v-for="item in purchasedItems" v-bind:key="item._id">
        <img
          class="items__image"
          :src="`images/${item.image}`"
          :alt="item.name"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ItemList",
  props: {
    purchasedItems: {
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
$size: 48px;

.items {
  &__image {
    width: $size;
    height: $size;
  }
}
</style>
