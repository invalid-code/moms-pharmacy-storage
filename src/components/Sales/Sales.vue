<script lang="ts">
import { watchEffect, ref } from "vue";
import {
  todays_sales,
  months,
  active_year,
  active_month,
  active_day,
  // active_hour,
  // active_seconds,
  base_url,
  MedicineData,
} from "../../MedicineList.js";
import axios from "axios";

export default {
  setup() {
    const total_today_sales = ref(0);

    watchEffect(() => {
      for (let i = 0; i < todays_sales.value.length; i++) {
        total_today_sales.value += todays_sales.value[i].sales;
      }
    });

    // watchEffect(() => {
    //   if (active_hour.value === 23 && active_seconds.value === 59) {
    //     axios.post<MedicineData>(base_url + "medicines", todays_sales.value);
    //   }
    // });

    const save_sales = async () => {
      // for (let i = 0; i < todays_sales.value.length; i++) {
      await axios.post<MedicineData>(
        base_url + "sales" + "/new",
        todays_sales.value
      );
      // }
    };

    return {
      todays_sales,
      total_today_sales,
      active_year,
      active_month,
      active_day,
      months,
      save_sales,
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
      </div>
    </div>
    <div>
      Total: {{ total_today_sales }}
      <span><button @click="save_sales">save</button></span>
    </div>
  </div>
</template>

<style scoped></style>
