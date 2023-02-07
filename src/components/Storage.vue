<script>
import { medicines } from "../MedicineList";

export default {
  setup() {
    return { medicines };
  },
};
</script>

<template>
  <div class="storage-list">
    <div class="storage-list-right">name</div>
    <div class="storage-list-right">price</div>
    <template v-for="medicine in medicines">
      <div class="storage-list-right">{{ medicine.name }}</div>
      <div class="storage-list-right">{{ medicine.price }}</div>
    </template>
  </div>
</template>

<style scoped>
.storage-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-left: solid 2px black;
  border-top: solid 2px black;
}
.storage-list-right {
  border-right: solid 2px black;
  border-bottom: solid 2px black;
}
</style>
