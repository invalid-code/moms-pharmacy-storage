<script lang="ts" setup>
import Search from "./Search.vue";
import {
  use_medicines_store,
  current_day,
  current_month,
  current_year,
  base_url,
} from "../state.js";
import axios from "axios";
import { ref, computed } from "vue";

const medicines_store = use_medicines_store();

const received_amount = ref(0);

const calculate_remaining_change = computed(
  () => received_amount.value - medicines_store.sales
);

const add_to_today_sales = async () => {
  let data: SalesData = {
    date: `${current_month}/${current_day}/${current_year}`,
    sales: medicines_store.sales,
  };

  let medicine_list = [];

  for (let i = 0; i < medicines_store.medicines.length; i++) {
    let medicine = medicines_store.medicines[i];

    if (medicine.is_countered) {
      medicine.stock -= medicine.chosen_quantity;

      medicine.chosen_quantity = 1;

      medicine_list.push({
        name: medicine.name,
        sold_quantity: medicine.chosen_quantity,
        price: medicine.price,
      });

      medicine.is_countered = false;

      medicine.chosen_quantity = 1;

      received_amount.value = 0;

      await axios.patch(base_url + "medicines" + "/" + medicine._id + "/edit", {
        stock: medicine.stock,
      });
    }
  }
  await medicines_store.get_medicines();

  data.data = medicine_list;

  medicines_store.todays_sales.push(data);
};
</script>

<template>
  <Search />
  <div class="order-list">
    <div v-for="medicine in medicines_store.medicines">
      <div v-if="medicine.is_countered">
        {{ medicine.name }}
        <input
          type="number"
          v-model="medicine.chosen_quantity"
          :max="medicine.stock"
        />
        <span>x</span>
      </div>
    </div>
  </div>
  <div>Total {{ medicines_store.sales }}</div>
  <input type="number" v-model="received_amount" />
  <button @click="add_to_today_sales">transact</button>
  <div>Change {{ calculate_remaining_change }}</div>
</template>

<style scoped></style>
