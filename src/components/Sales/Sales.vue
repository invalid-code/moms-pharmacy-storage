<script lang="ts" setup>
import axios from "axios";
import {
  use_medicines_store,
  months,
  active_year,
  active_month,
  active_day,
  base_url,
} from "../../state.js";

const medicines_store = use_medicines_store();

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
      Total: {{ medicines_store.total_today_sales }}
      <span><button @click="save_sales">save</button></span>
    </div>
  </div>
</template>

<style scoped></style>
