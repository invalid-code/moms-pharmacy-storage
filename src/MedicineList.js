import { createStore } from "solid-js/store";

export const [medicines, set_medicines] = createStore([
  { name: "medicine 1", price: 1, is_searched: false, is_countered: false },
  { name: "medicine 2", price: 2, is_searched: false, is_countered: false },
  { name: "medicine 3", price: 3, is_searched: false, is_countered: false },
  { name: "medicine 4", price: 4, is_searched: false, is_countered: false },
  { name: "medicine 5", price: 5, is_searched: false, is_countered: false },
]);
