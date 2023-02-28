import { ref } from "vue";
import { defineStore } from "pinia";
import { computed } from "vue";
import axios from "axios";

export const base_url = "http://localhost:8000/";

export const use_medicines_store = defineStore("medicines", () => {
  const medicines = ref(null as MedicineData[] | null);

  const todays_sales = ref(null as SalesData[] | null);

  const get_sales = async () => {
    const { data } = await axios.get<MedicineData[]>(base_url + "sales");
    todays_sales.value = data;
  };

  const get_medicines = async () => {
    const { data } = await axios.get<SalesData[]>(base_url + "medicines");
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
    get_medicines,
    sales,
    todays_sales,
    get_sales,
    total_today_sales,
  };
});

const date = new Date();

export const current_year = date.getFullYear();

export const current_month = date.getMonth();

export const current_day = date.getDate();

export const active_day = ref(current_day);

export const active_month = ref(current_month);

export const active_year = ref(current_year);

export const years = [2023];

export const week_days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 },
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 },
];
