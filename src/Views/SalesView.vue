<script lang="ts" setup>
import axios from "axios";
import {
  use_medicines_store,
  base_url,
  months,
  active_day,
  active_month,
  active_year,
} from "../state.js";
import { ref, watch } from "vue";

const medicines_store = use_medicines_store();

const date = ref(new Date());

const save_sales = async () => {
  for (let i = 0; i < medicines_store.todays_sales.length; i++) {
    await axios.post(base_url + "sales/new", medicines_store.todays_sales[i]);
  }
  await medicines_store.get_sales();
};

watch(date, (date) => {
  active_day.value = date.getDate();
  active_month.value = date.getMonth();
  active_year.value = date.getFullYear();
});
</script>

<template>
  <VDatePicker v-model="date" mode="date" />
  <div>{{ months[active_month] }} {{ active_day }}, {{ active_year }}</div>
  <div v-for="sales in medicines_store.todays_sales">
    <div v-if="sales.date === `${active_month}/${active_day}/${active_year}`">
      <div v-for="medicine_data in sales.data">
        {{ medicine_data.sold_quantity }} {{ medicine_data.name }}
        {{ medicine_data.price * medicine_data.sold_quantity }}
      </div>
    </div>
  </div>
  <div>
    Total: {{ medicines_store.total_today_sales }}
    <span><button @click="save_sales">save</button></span>
  </div>
</template>

<style scoped>
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.header {
  grid-column: 2 / -2;
  text-align: center;
}

.is-current-day {
  font-weight: bold;
}
</style>
