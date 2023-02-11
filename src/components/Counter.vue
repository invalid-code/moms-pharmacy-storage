<script>
import Search from "./Search.vue";
import {
  medicines,
  todays_sales,
  current_day,
  current_month,
  current_year,
} from "../MedicineList";
import { ref, computed, watchEffect } from "vue";

export default {
  setup() {
    const sales = ref(0);
    const received_amount = ref(0);

    const calculate_remaining_change = computed(
      () => received_amount.value - sales.value
    );

    watchEffect(() => {
      let total_sales = 0;
      for (let i = 0; i < medicines.value.length; i++) {
        let medicine = medicines.value[i];
        if (medicine.is_countered) {
          total_sales += medicine.price * medicine.chosen_quantity;
        }
      }
      sales.value = total_sales;
      return total_sales;
    });

    const add_to_today_sales = () => {
      let data = {
        date: `${current_month.value}/${current_day.value}/${current_year.value}`,
        sales: sales.value,
      };
      let medicine_list = [];
      for (let i = 0; i < medicines.value.length; i++) {
        let medicine = medicines.value[i];
        if (medicine.is_countered) {
          medicine.quantity -= medicine.chosen_quantity;
          medicine.chosen_quantity = 1;
          medicine_list.push({
            name: medicine.name,
            sold_quantity: medicine.chosen_quantity,
            price: medicine.price,
          });
          medicine.is_countered = false;
          medicine.chosen_quantity = 1;
          received_amount.value = 0;
        }
      }
      data.data = medicine_list;
      todays_sales.value.push(data);
    };

    return {
      medicines,
      received_amount,
      calculate_remaining_change,
      sales,
      add_to_today_sales,
    };
  },
  components: { Search },
};
</script>

<template>
  <Search />
  <div class="order-list">
    <div v-for="medicine in medicines">
      <div v-if="medicine.is_countered">
        {{ medicine.name }}
        <input
          type="number"
          v-model="medicine.chosen_quantity"
          :max="medicine.quantity"
        />
        <span>x</span>
      </div>
    </div>
    <div>Total {{ sales }}</div>
    <input type="number" v-model="received_amount" />
    <button @click="add_to_today_sales">transact</button>
    <div>Change {{ calculate_remaining_change }}</div>
  </div>
</template>

<style scoped></style>
