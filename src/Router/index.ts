import { createRouter, createWebHistory } from "vue-router";
import CounterView from "../Views/CounterView.vue";
import StorageView from "../Views/StorageView.vue";
import SalesView from "../Views/SalesView.vue";

const routes = [
  { path: "/counter", component: CounterView },
  { path: "/storage", component: StorageView },
  { path: "/sales", component: SalesView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
