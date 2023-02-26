<script lang="ts" setup>
import { onMounted } from "vue";
import {
  get_medicines,
  medicines,
  todays_sales,
  get_sales,
} from "./MedicineList.js";

onMounted(async () => {
  medicines.value = await get_medicines();
  todays_sales.value = await get_sales();
});
</script>

<template>
  <nav>
    <router-link to="/counter">Counter</router-link>
    <router-link to="/storage">Storage</router-link>
    <router-link to="/sales">Sales</router-link>
  </nav>
  <router-view></router-view>
</template>
