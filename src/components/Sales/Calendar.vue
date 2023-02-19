<script lang="ts">
import {
  active_day,
  active_month,
  active_year,
  current_month,
  current_year,
  years,
  months,
  week_days,
} from "../../MedicineList.js";

export default {
  setup() {
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
      change_active_day,
      change_active_month,
      change_active_year,
      active_day,
      active_year,
      active_month,
      current_month,
      current_year,
      months,
      years,
      week_days,
    };
  },
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
          :id="day.toString()"
          @click="change_active_day"
        >
          {{ day }}
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped></style>
