import { For } from "solid-js";
import { medicines } from "../MedicineList";
import styles from "./Storage.module.css";

function Storage() {
  return (
    <>
      <div>Storage List</div>
      <div class={styles.storage_list}>
        <div class={styles.storage_item}>name</div>
        <div class={styles.storage_item}>price</div>
        <For each={medicines}>
          {(medicine) => (
            <>
              <div class={styles.storage_item}>{medicine.name}</div>
              <div class={styles.storage_item}>{medicine.price}</div>
            </>
          )}
        </For>
      </div>
    </>
  );
}

export default Storage;
