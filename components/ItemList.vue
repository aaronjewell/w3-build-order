<template>
  <div class="w3bo-items">
    <ul class="w3bo-items__list w3bo-list-unstyled">
      <li v-for="item in purchasedItems" v-bind:key="item._id">
        <img
          class="w3bo-items__image"
          :src="require(`../images/${item.image}`)"
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
