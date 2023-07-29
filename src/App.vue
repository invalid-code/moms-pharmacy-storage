<script lang="ts" setup>
import { onMounted } from "vue";
import { use_medicines_store } from "./state.js";

const medicines_store = use_medicines_store();

onMounted(async () => {
  await Promise.all([
    medicines_store.get_medicines(),
    medicines_store.get_sales(),
  ]);
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
