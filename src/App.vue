<script lang="ts" setup>
import { onMounted } from "vue";
import { get_medicines, medicines } from "./MedicineList.js";

onMounted(async () => {
  medicines.value = await get_medicines();
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
