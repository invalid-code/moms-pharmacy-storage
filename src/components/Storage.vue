<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
import { base_url, use_medicines_store } from "../globals.js";

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

const edit_storage_name = (e: MouseEvent) => {
  storage_medicine.value[parseInt(e.target.id)].medicine_name =
    !storage_medicine.value[parseInt(e.target.id)];
};

const edit_storage_price = async (e: MouseEvent) => {
  storage_medicine.value[parseInt(e.target.id)].medicine_price =
    !storage_medicine.value[parseInt(e.target.id)].medicine_price;
};

const edit_storage_stock = async (e: MouseEvent) => {
  storage_medicine.value[parseInt(e.target.id)].medicine_stock =
    !storage_medicine.value[parseInt(e.target.id)].medicine_stock;
};

const save_edited_name = async (e: MouseEvent, id: string, i: number) => {
  let url = base_url + "medicines/" + id + "/edit";
  await axios.patch(url, {
    name: storage_medicine.value[i].current_edit_name,
  });
  storage_medicine.value[i].medicine_name =
    !storage_medicine.value[i].medicine_name;
  medicines_store.get_medicines();
};

const save_edited_price = async (e: MouseEvent, id: string, i: number) => {
  await axios.patch(base_url + "medicines/" + id + "/edit", {
    price: storage_medicine.value[i].current_edit_price,
  });
  storage_medicine.value[i].medicine_price =
    !storage_medicine.value[i].medicine_price;
  medicines_store.get_medicines();
};

const save_edited_stock = async (e: MouseEvent, id: string, i: number) => {
  await axios.patch(base_url + "medicines/" + id + "/edit", {
    stock: storage_medicine.value[i].current_edit_stock,
  });
  storage_medicine.value[i].medicine_stock =
    !storage_medicine.value[i].medicine_stock;
  medicines_store.get_medicines();
};
</script>

<template>
  <div class="storage-list">
    <div class="storage-list-right">name</div>
    <div class="storage-list-right">price</div>
    <div class="storage-list-right">quantity</div>
    <template v-for="(medicine, i) in medicines_store.medicines">
      <div class="storage-list-right">
        <span v-if="storage_medicine[i].medicine_name">{{
          medicine.name
        }}</span>
        <input v-else v-model="storage_medicine[i].current_edit_name" />
        <span
          ><button
            v-if="storage_medicine[i].medicine_name"
            @click="edit_storage_name"
            :id="i.toString()"
          >
            edit</button
          ><button v-else @click="(e) => save_edited_name(e, medicine._id, i)">
            submit
          </button></span
        >
      </div>
      <div class="storage-list-right">
        <span v-if="storage_medicine[i].medicine_price">{{
          medicine.price
        }}</span>
        <input v-else v-model="storage_medicine[i].current_edit_price" />
        <span
          ><button
            v-if="storage_medicine[i].medicine_price"
            @click="edit_storage_price"
            :id="i.toString()"
          >
            edit</button
          ><button v-else @click="(e) => save_edited_price(e, medicine._id, i)">
            submit
          </button></span
        >
      </div>
      <div class="storage-list-right">
        <span v-if="storage_medicine[i].medicine_stock">{{
          medicine.stock
        }}</span>
        <input v-else v-model="storage_medicine[i].current_edit_stock" />
        <span>
          <button
            v-if="storage_medicine[i].medicine_stock"
            @click="edit_storage_stock"
            :id="i.toString()"
          >
            edit
          </button>
          <button v-else @click="(e) => save_edited_stock(e, medicine._id, i)">
            submit
          </button></span
        >
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
