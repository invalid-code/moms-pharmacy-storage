<script lang="ts" setup>
import { ref } from "vue";
import { base_url, use_medicines_store, search_query } from "../state.js";
import axios from "axios";
import MedicineRow from "../components/MedicineRow.vue";
import Search from "../components/Search.vue";

const medicines_store = use_medicines_store();

const storage_medicine = ref(
  Array.from(medicines_store.medicines, (el, _) => {
    return {
      medicine_name: true,
      medicine_price: true,
      medicine_stock: true,
      current_edit_name: el.name,
      current_edit_price: el.price,
      current_edit_stock: el.stock,
    };
  })
);

let new_medicine = ref({ name: "", stock: 0, price: 0 });

let save_new_medicine = async () => {
  let new_medicine_val = new_medicine.value;
  if (
    new_medicine_val.name === "" ||
    new_medicine_val.price === 0 ||
    new_medicine_val.stock === 0
  ) {
    return;
  }
  await axios.post(base_url + "medicines/new", new_medicine.value);
  storage_medicine.push({
    medicine_name: true,
    medicine_price: true,
    medicine_stock: true,
    current_edit_name: new_medicine_val.name,
    current_edit_price: new_medicine_val.price,
    current_edit_stock: new_medicine_val.stock,
  });
  medicines_store.get_medicines();
};
</script>

<template>
  <Search />
  <div class="storage-list">
    <div class="storage-list-right">name</div>
    <div class="storage-list-right">price</div>
    <div class="storage-list-right">quantity</div>
    <template v-for="(medicine, i) in medicines_store.medicines">
      <template v-if="search_query.length > 0">
        <template v-if="medicine.is_searched">
          <MedicineRow :medicine="medicine" :i="i" />
        </template>
      </template>
      <template v-else>
        <MedicineRow :medicine="medicine" :i="i" />
      </template>
    </template>
    <div class="storage-list-right">
      <input type="text" v-model="new_medicine.name" />
    </div>
    <div class="storage-list-right">
      <input type="text" v-model="new_medicine.price" />
    </div>
    <div class="storage-list-right">
      <input type="text" v-model="new_medicine.stock" />
    </div>
  </div>
  <button @click="save_new_medicine">submit</button>
</template>

<style>
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
