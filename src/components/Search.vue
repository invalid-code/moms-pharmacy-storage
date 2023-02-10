<script>
import { medicines } from "../MedicineList";
import { ref, watch } from "vue";

export default {
  setup() {
    const search_query = ref("");

    const add_to_counter = (e) => {
      for (let i = 0; i < medicines.value.length; i++) {
        let medicine = medicines.value[i];
        if (medicine.name == e.target.textContent) {
          medicine.is_countered = true;
          medicine.is_searched = false;
          search_query.value = "";
        }
      }
    };

    watch(search_query, () => {
      for (let i = 0; i < medicines.value.length; i++) {
        let medicine = medicines.value[i];
        if (
          medicine.name.includes(search_query.value) &&
          search_query.value.length > 0
        ) {
          if (medicine.quantity > 0) {
            medicine.is_searched = true;
          }
        } else {
          medicine.is_searched = false;
        }
      }
    });

    return { medicines, search_query, add_to_counter };
  },
};
</script>

<template>
  <input type="text" v-model="search_query" />
  <div class="medicine-list">
    <div v-for="medicine in medicines">
      <div v-if="medicine.is_searched" @click="add_to_counter">
        {{ medicine.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.medicine-list {
  position: absolute;
  width: 13rem;
}
</style>
