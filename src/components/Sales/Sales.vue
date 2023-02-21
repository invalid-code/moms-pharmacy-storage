<script lang="ts">
import { watchEffect, ref } from "vue";
import {
  todays_sales,
  months,
  active_year,
  active_month,
  active_day,
} from "../../MedicineList.js";

export default {
  setup() {
    const total_today_sales = ref(0);

    watchEffect(() => {
      for (let i = 0; i < todays_sales.value.length; i++) {
        total_today_sales.value += todays_sales.value[i].sales;
      }
    });

    return {
      todays_sales,
      total_today_sales,
      active_year,
      active_month,
      active_day,
      months,
    };
  },
  components: {},
};
</script>

<template>
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

<style scoped></style>
