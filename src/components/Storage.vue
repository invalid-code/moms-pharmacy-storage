<script>
import { medicines } from "../MedicineList";
import { ref } from "vue";

export default {
  setup() {
    const medicine_name = ref(null);
    const medicine_price = ref(null);
    const medicine_stock = ref(null);
    const edit_storage_item = (e) => {
      console.log(medicine_name.value);
    };

    return {
      medicines,
      edit_storage_item,
      medicine_stock,
      medicine_price,
      medicine_name,
    };
  },
};
</script>

<template>
  <div class="storage-list">
    <div class="storage-list-right">name</div>
    <div class="storage-list-right">price</div>
    <div class="storage-list-right">quantity</div>
    <template v-for="medicine in medicines">
      <div class="storage-list-right">
        <span :ref="medicine_name">{{ medicine.name }}</span>
        <span><button @click="edit_storage_item">edit</button></span>
      </div>
      <div class="storage-list-right">
        <span :ref="medicine_price">{{ medicine.price }}</span>
        <span><button @click="edit_storage_item">edit</button></span>
      </div>
      <div class="storage-list-right">
        <span :ref="medicine_stock">{{ medicine.stock }}</span>
        <span><button @click="edit_storage_item">edit</button></span>
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
