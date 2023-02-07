<script>
import { ref } from "vue";

export default {
  setup() {
    const date = new Date();

    const current_year = ref(date.getFullYear());

    const current_month = ref(date.getMonth());

    const current_day = ref(date.getDay());

    const week_days = ref([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]);

    const years = ref([2023]);

    const months = ref([
      { name: "January", days: 31 },
      { name: "February", days: 28 },
      { name: "March", days: 31 },
      { name: "April", days: 30 },
      { name: "May", days: 31 },
      { name: "June", days: 30 },
      { name: "July", days: 31 },
      { name: "August", days: 31 },
      { name: "September", days: 30 },
      { name: "October", days: 31 },
      { name: "November", days: 30 },
      { name: "December", days: 31 },
    ]);

    console.log(current_day.value);

    return {
      months,
      current_year,
      current_month,
      current_day,
      years,
      week_days,
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
  <div>this is sales from the date chosen from the calendar</div>
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
