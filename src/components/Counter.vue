<script>
import Search from "./Search.vue";
import { medicines } from "../MedicineList";
import { ref, computed, watch } from "vue";

export default {
  setup() {
    const sales = ref(0);
    const received_amount = ref(0);

    const calculate_remaining_change = computed(
      () => received_amount.value - sales.value
    );

    const calculate_total_sales = watch(() => {
      let total_sales = 0;
      for (let i = 0; i < medicines.value.length; i++) {
        let medicine = medicines.value[i];
        if (medicine.is_countered) {
          total_sales += medicine.price;
        }
      }
      sales.value = total_sales;
      return total_sales;
    });

    return {
      medicines,
      calculate_total_sales,
      received_amount,
      calculate_remaining_change,
      sales,
    };
  },
  components: { Search },
};
</script>

<template>
  <Search />
  <div class="order-list">
    <div v-for="medicine in medicines">
      <div v-if="medicine.is_countered">{{ medicine.name }}</div>
    </div>
    <div>Total {{ sales }}</div>
    <input type="number" v-model="received_amount" />
    <button>transact</button>
    <div>Change {{ calculate_remaining_change }}</div>
  </div>
</template>

<style scoped></style>
