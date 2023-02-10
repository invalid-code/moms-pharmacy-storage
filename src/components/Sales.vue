<script>
import {
  months,
  current_year,
  current_month,
  current_day,
  years,
  week_days,
  todays_sales,
} from "../MedicineList";
// import { computed } from "vue";

export default {
  setup() {
    const total_sales = () => {
      let total = 0;
      for (let i = 0; i < todays_sales.value; i++) {
        console.log(todays_sales.value);
        total += todays_sales.value[i].sales;
      }
      return total;
    };

    return {
      months,
      current_year,
      current_month,
      current_day,
      years,
      week_days,
      todays_sales,
      total_sales,
    };
  },
};
</script>

<template>
  <div class="calendar">
    <div v-for="year in years" class="header">
      <div v-if="year === current_year">{{ year }}</div>
      <div v-else class="inactive-year">{{ year }}</div>
    </div>
    <template v-for="month in months">
      <template v-if="month.name === months[current_month].name">
        <div class="header">{{ month.name }}</div>
        <div v-for="week_day in week_days">{{ week_day }}</div>
        <div
          v-for="day in month.days"
          :class="{ 'is-current-day': day === current_day }"
        >
          {{ day }}
        </div>
      </template>
      <!-- <template v-else class="inactive-month">
        <div>{{ month.name }}</div>
        <div v-for="week_day in week_days">{{ week_day }}</div>
        <div v-for="day in month.days">{{ day }}</div>
      </template> -->
    </template>
  </div>
  <div>
    <div>
      {{ months[current_month].name }} {{ current_day }}, {{ current_year }}
    </div>
    <div v-for="sales in todays_sales">
      <div v-for="medicine_data in sales.data">
        {{ medicine_data.sold_quantity }} {{ medicine_data.name }}
        {{ medicine_data.price * medicine_data.sold_quantity }}
      </div>
    </div>
    <div>Total: {{ total_sales() }}</div>
  </div>
</template>

<style scoped>
.inactive-year {
  display: none;
}

.inactive-month {
  display: none;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.header {
  grid-column: 1/-1;
  text-align: center;
}

.is-current-day {
  font-weight: bold;
}
</style>
