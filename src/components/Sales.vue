<script>
import {
  months,
  current_year,
  current_month,
  // current_day,
  active_day,
  active_month,
  active_year,
  week_days,
  years,
  todays_sales,
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
    };
  },
  components: {},
};
</script>

<template>
  <div class="calendar">
    <div v-for="year in years" class="header">
      <div v-if="year === active_year">{{ year }}</div>
      <div v-else class="inactive-year">{{ year }}</div>
    </div>
    <template v-for="month in months">
      <template v-if="month.name === months[active_month].name">
        <div class="header">{{ month.name }}</div>
        <div v-for="week_day in week_days">{{ week_day }}</div>
        <div
          v-for="day in month.days"
          :class="{ 'is-current-day': day === active_day }"
          :id="day"
          @click="change_active_day"
        >
          {{ day }}
        </div>
      </template>
      <!-- <template v-else class="inactive-month"> -->
      <!-- <div>{{ month.name }}</div> -->
      <!-- <div v-for="week_day in week_days">{{ week_day }}</div> -->
      <!-- <div v-for="day in month.days">{{ day }}</div> -->
      <!-- </template> -->
    </template>
  </div>

  <div>
    <div>
      {{ months[active_month].name }} {{ active_day }}, {{ active_year }}
    </div>
    <div v-for="sales in todays_sales">
      {{ sales }}
      <div v-for="medicine_data in sales.data">
        {{ medicine_data.sold_quantity }} {{ medicine_data.name }}
        {{ medicine_data.price * medicine_data.sold_quantity }}
      </div>
    </div>
    <div>Total: {{ total_today_sales }}</div>
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
