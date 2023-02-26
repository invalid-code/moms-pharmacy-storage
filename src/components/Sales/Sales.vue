<script lang="ts" setup>
import { watchEffect, ref } from "vue";
import {
  use_medicines_store,
  months,
  active_year,
  active_month,
  active_day,
  // active_hour,
  // active_seconds,
  base_url,
} from "../../globals.js";
import axios from "axios";

const medicines_store = use_medicines_store();

const total_today_sales = ref(0);

watchEffect(() => {
  for (let i = 0; i < medicines_store.todays_sales.length; i++) {
    if (
      medicines_store.todays_sales[i].date ===
      `${active_month.value}/${active_day.value}/${active_year.value}`
    )
      total_today_sales.value += medicines_store.todays_sales[i].sales;
  }
});

// watchEffect(() => {
//   if (active_hour.value === 23 && active_seconds.value === 59) {
//     axios.post<MedicineData>(base_url + "medicines", todays_sales.value);
//   }
// });

const save_sales = async () => {
  for (let i = 0; i < medicines_store.todays_sales.length; i++) {
    await axios.post(
      base_url + "sales" + "/new",
      medicines_store.todays_sales[i]
    );
  }
  await medicines_store.get_sales();
};
</script>

<template>
  <div>
    <div>
      {{ months[active_month].name }} {{ active_day }}, {{ active_year }}
    </div>
    <div v-for="sales in medicines_store.todays_sales">
      <div v-if="sales.date === `${active_month}/${active_day}/${active_year}`">
        <div v-for="medicine_data in sales.data">
          {{ medicine_data.sold_quantity }} {{ medicine_data.name }}
          {{ medicine_data.price * medicine_data.sold_quantity }}
        </div>
      </div>
    </div>
    <div>
      Total: {{ total_today_sales }}
      <span><button @click.prevent="save_sales">save</button></span>
    </div>
  </div>
</template>

<style scoped></style>
