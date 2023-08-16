import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const base_url = "http://localhost:8000/";

export const use_medicines_store = defineStore("medicines", () => {
  const medicines = ref<MedicineData[] | null>(null);

  const todays_sales = ref<SalesData[] | null>(null);

  const get_sales = async () => {
    const { data } = await axios.get<SalesData[]>(base_url + "sales");
    todays_sales.value = data;
  };

  const get_medicines = async () => {
    const { data } = await axios.get<MedicineData[]>(base_url + "medicines");
    medicines.value = data;
  };

  const sales = computed(() => {
    let total_sales = 0;
    for (let i = 0; i < medicines.value.length; i++) {
      let medicine = medicines.value[i];
      if (medicine.is_countered) {
        total_sales += medicine.price * medicine.chosen_quantity;
      }
    }
    return total_sales;
  });

  const total_today_sales = computed(() => {
    let total_sales = 0;
    for (let i = 0; i < todays_sales.value.length; i++) {
      if (
        todays_sales.value[i].date ===
        `${active_month.value}/${active_day.value}/${active_year.value}`
      )
        total_sales += todays_sales.value[i].sales;
    }
    return total_sales;
  });

  return {
    medicines,
    sales,
    todays_sales,
    total_today_sales,
    get_medicines,
    get_sales,
  };
});

export const search_query = ref("");

watch(search_query, (search_query) => {});

const date = new Date();

export const current_year = date.getFullYear();

export const current_month = date.getMonth();

export const current_day = date.getDate();

export const active_day = ref(current_day);

export const active_month = ref(current_month);

export const active_year = ref(current_year);

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
