<script lang="ts">
import { medicines } from "../MedicineList.js";
import { ref } from "vue";

export default {
  setup() {
    const medicine_name = ref([]);
    const medicine_price = ref([]);
    const medicine_stock = ref([]);
    const edit_storage_name = () => {};
    const edit_storage_price = () => {};
    const edit_storage_stock = () => {};

    return {
      medicines,
      edit_storage_name,
      medicine_stock,
      medicine_price,
      medicine_name,
      edit_storage_price,
      edit_storage_stock,
    };
  },
};
</script>

<template>
  <div class="storage-list">
    <div class="storage-list-right">name</div>
    <div class="storage-list-right">price</div>
    <div class="storage-list-right">quantity</div>
    <template v-for="(medicine, i) in medicines">
      <div class="storage-list-right">
        <span>{{ medicine.name }}</span>
        <span><button @click="edit_storage_name" :id="i">edit</button></span>
      </div>
      <div class="storage-list-right">
        <span>{{ medicine.price }}</span>
        <span><button @click="edit_storage_price" :id="i">edit</button></span>
      </div>
      <div class="storage-list-right">
        <span>{{ medicine.stock }}</span>
        <span><button @click="edit_storage_stock" :id="i">edit</button></span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.storage-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-left: solid 2px black;
  border-top: solid 2px black;
}

.storage-list-right {
  border-right: solid 2px black;
  border-bottom: solid 2px black;
}
</style>
