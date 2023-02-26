export {};

declare global {
  interface SalesData {
    date: string;
    sales: number;
    data?: { name: string; sold_quantity: number; price: number }[];
  }

  interface MedicineData {
    _id: string;
    name: string;
    stock: number;
    price: number;
    is_countered: boolean;
    is_searched: boolean;
    chosen_quantity: number;
  }
}
