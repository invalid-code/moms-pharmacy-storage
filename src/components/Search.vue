<script lang="ts" setup>
import { use_medicines_store, search_query } from "../state.js";
import { watch } from "vue";

const medicines_store = use_medicines_store();

watch(search_query, (search_query) => {
  for (let i = 0; i < medicines_store.medicines.length; i++) {
    let medicine = medicines_store.medicines[i];
    if (
      medicine.name.includes(search_query) &&
      search_query.length > 0 &&
      medicine.stock > 0
    ) {
      medicine.is_searched = true;
    } else {
      medicine.is_searched = false;
    }
  }
});
</script>

<template>
  <input type="text" v-model="search_query" />
  <slot></slot>
</template>

<style scoped></style>
