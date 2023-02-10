import { ref } from "vue";

export const medicines = ref([
  {
    name: "medicine 1",
    price: 1,
    is_searched: false,
    is_countered: false,
    quantity: 1,
    chosen_quantity: 1,
  },
  {
    name: "medicine 2",
    price: 2,
    is_searched: false,
    is_countered: false,
    quantity: 2,
    chosen_quantity: 1,
  },
  {
    name: "medicine 3",
    price: 3,
    is_searched: false,
    is_countered: false,
    quantity: 3,
    chosen_quantity: 1,
  },
  {
    name: "medicine 4",
    price: 4,
    is_searched: false,
    is_countered: false,
    quantity: 4,
    chosen_quantity: 1,
  },
  {
    name: "medicine 5",
    price: 5,
    is_searched: false,
    is_countered: false,
    quantity: 5,
    chosen_quantity: 1,
  },
]);

export const todays_sales = ref([]);

export const date = new Date();

export const current_year = ref(date.getFullYear());

export const current_month = ref(date.getMonth());

export const current_day = ref(date.getDate());

export const week_days = ref([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

export const years = ref([2023]);

export const months = ref([
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
]);
