<script lang="ts" setup>
import { use_medicines_store } from "../state.js";
import { ref, watchEffect } from "vue";

const medicines_store = use_medicines_store();

const search_query = ref("");

const add_to_counter = (e: MouseEvent) => {
  for (let i = 0; i < medicines_store.medicines.length; i++) {
    let medicine = medicines_store.medicines[i];
    if (medicine.name == e.target.textContent) {
      medicine.is_countered = true;
      medicine.chosen_quantity = 1;
      medicine.is_searched = false;
      search_query.value = "";
    }
  }
};

watchEffect(() => {
  for (let i = 0; i < medicines_store.medicines.length; i++) {
    let medicine = medicines_store.medicines[i];
    if (
      medicine.name.includes(search_query.value) &&
      search_query.value.length > 0
    ) {
      if (medicine.stock > 0) {
        medicine.is_searched = true;
      }
    } else {
      medicine.is_searched = false;
    }
  }
});
</script>

<template>
  <input type="text" v-model="search_query" />
  <div class="medicine-list">
    <div v-for="medicine in medicines_store.medicines">
      <div v-if="medicine.is_searched" @click="add_to_counter" class="searched">
        {{ medicine.name }}
      </div>
    </div>
  </div>
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
