<script lang="ts">
import { medicines, base_url } from "../MedicineList.js";
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const storage_medicine = ref(
      Array.from(medicines.value, (el, i) => {
        console.log(i);
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

    const edit_storage_name = (e) => {
      storage_medicine.value[parseInt(e.target.id)].medicine_name =
        !storage_medicine.value[parseInt(e.target.id)].medicine_name;
    };

    const edit_storage_price = (e) => {
      storage_medicine.value[parseInt(e.target.id)].medicine_price =
        !storage_medicine.value[parseInt(e.target.id)].medicine_price;
    };

    const edit_storage_stock = (e) => {
      storage_medicine.value[parseInt(e.target.id)].medicine_stock =
        !storage_medicine.value[parseInt(e.target.id)].medicine_stock;
    };

    const save_edited_name = async (e: MouseEvent, id: string) => {
      await axios.post(save_edited_name + "/medicines/" + id);
    };

    return {
      medicines,
      edit_storage_name,
      storage_medicine,
      edit_storage_price,
      edit_storage_stock,
      save_edited_name,
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
          ><button v-else @click="(e) => save_edited_name(e, medicine._id)">
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
            v-if="storage_medicine[i]"
            @click="edit_storage_price"
            :id="i.toString()"
          >
            edit</button
          ><button v-else>submit</button></span
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
          <button v-else>submit</button></span
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
