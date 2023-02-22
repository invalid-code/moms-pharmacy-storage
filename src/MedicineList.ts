import { ref, watchEffect } from "vue";
import axios, { AxiosResponse } from "axios";

export interface SalesData {
  date: string;
  sales: number;
  data?: { name: string; sold_quantity: number; price: number }[];
}

interface MedicineData {
  _id: string;
  name: string;
  stock: number;
  price: number;
}

export const base_url = "http://localhost:8000/";

export const get_medicines = async () => {
  const { data } = await axios.get<any, AxiosResponse<MedicineData[]>>(
    base_url + "medicines"
  );
  return data;
};

export const medicines = ref(await get_medicines());

export const todays_sales = ref<SalesData[]>([]);

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
