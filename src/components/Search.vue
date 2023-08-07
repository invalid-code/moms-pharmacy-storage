<script lang="ts" setup>
import { use_medicines_store, search_query } from "../state.js";
import { watchEffect } from "vue";

const medicines_store = use_medicines_store();

watchEffect(() => {
  for (let i = 0; i < medicines_store.medicines.length; i++) {
    let medicine = medicines_store.medicines[i];
    if (
      medicine.name.includes(search_query.value) &&
      search_query.value.length > 0 && medicine.stock > 0
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

<style scoped>
.medicine-list {
  position: absolute;
  width: 13rem;
  background-color: white;
}

.searched:hover {
  background-color: rgb(197, 197, 197);
}
</style>
