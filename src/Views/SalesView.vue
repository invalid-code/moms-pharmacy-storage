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
import { ref } from "vue";

const attrs = ref([{ highlight: true, dates: new Date() }]);
const medicines_store = use_medicines_store();

const save_sales = async () => {
  for (let i = 0; i < medicines_store.todays_sales.length; i++) {
    await axios.post(base_url + "sales/new", medicines_store.todays_sales[i]);
  }
  await medicines_store.get_sales();
};
</script>

<template>
  <VCalendar :attributes="attrs" />
  <!-- <div class="calendar">
    <button @click="change_active_year" id="previous_year">previous</button>
    <template v-for="year in years">
      <div v-if="year === active_year" class="header">{{ year }}</div>
    </template>
    <button @click="change_active_year" id="next_year">next</button>
    <template v-for="month in months">
      <template v-if="month.name === months[active_month].name">
        <button @click="change_active_month" id="previous_month">
          previous
        </button>
        <div class="header">{{ month.name }}</div>
        <button @click="change_active_month" id="next_month">next</button>
        <div v-for="week_day in week_days">{{ week_day }}</div>
        <div
          v-for="day in month.days"
          :class="{
            'is-current-day':
              day === active_day &&
              month.name === months[active_month].name &&
              years[years.indexOf(active_year)] === current_year,
          }"
          :id="day.toString()"
          @click="change_active_day"
        >
          {{ day }}
        </div>
      </template>
    </template>
  </div> -->
  <div>{{ months[active_month].name }} {{ active_day }}, {{ active_year }}</div>
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
