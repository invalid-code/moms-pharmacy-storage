<script>
import {
  months,
  active_day,
  active_month,
  active_year,
  week_days,
  years,
  todays_sales,
  current_month,
  current_year,
} from "../MedicineList";
import { watchEffect, ref } from "vue";

export default {
  setup() {
    const total_today_sales = ref(0);

    watchEffect(() => {
      for (let i = 0; i < todays_sales.value.length; i++) {
        total_today_sales.value += todays_sales.value[i].sales;
      }
    });


    const change_active_day = (e) => {
      active_day.value = parseInt(e.target.id);
    };

    const change_active_month = (e) => {
      if (e.target.id === "previous_month") {
        if (
          active_month.value === 0 &&
          years.value.indexOf(active_year.value) === 0
        ) {
          active_month.value = 11;
          active_year.value -= 1;
        } else {
          active_month.value -= 1;
        }
      } else {
        active_month.value += 1;
      }
    };

    const change_active_year = (e) => {
      if (e.target.id === "previous_year") {
        let active_year_index = years.value.indexOf(active_year.value);
        if (active_year_index > 0) {
          active_year.value -= 1;
        }
      } else {
        years.value.push(active_year.value + 1);
        active_year.value = active_year.value + 1;
      }
    };

    return {
      months,
      years,
      active_day,
      active_month,
      active_year,
      todays_sales,
      total_today_sales,
      week_days,
      change_active_day,
      change_active_month,
      change_active_year,
      current_month,
      current_year,
    };
  },
  components: {},
};
</script>

<template>
  <div class="calendar">
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
              month.name === months[current_month].name &&
              years[years.indexOf(active_year)] === current_year,
          }"
          :id="day"
          @click="change_active_day"
        >
          {{ day }}
        </div>
      </template>
    </template>
  </div>

  <div>
    <div>
      {{ months[active_month].name }} {{ active_day }}, {{ active_year }}
    </div>
    <div v-for="sales in todays_sales">
      <div v-if="sales.date === `${active_month}/${active_day}/${active_year}`">
        <div v-for="medicine_data in sales.data">
          {{ medicine_data.sold_quantity }} {{ medicine_data.name }}
          {{ medicine_data.price * medicine_data.sold_quantity }}
        </div>
        <div>Total: {{ total_today_sales }}</div>
      </div>
    </div>
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
