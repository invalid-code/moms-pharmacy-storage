import { createSignal, For, Show, createEffect } from "solid-js";
import styles from "./Search.module.css";
import { medicines, set_medicines } from "../MedicineList";

function Search() {
  const [search_query, set_search_query] = createSignal("");

  const searching = (e) => {
    set_search_query(e.currentTarget.value);
    for (let i = 0; i < medicines.length; i++) {
      if (
        medicines[i].name.includes(search_query()) &&
        search_query().length > 0
      ) {
        set_medicines(i, { is_searched: true });
      } else {
        set_medicines(i, { is_searched: false });
      }
    }
  };

  createEffect(() => console.log(medicines));

  const add_to_counter = (e) => {
    for (let i = 0; i < medicines.length; i++) {
      if (medicines[i].name == e.target.textContent) {
        set_medicines(i, { is_countered: true });
        set_search_query("");
      }
    }
  };

  return (
    <>
      <form>
        <input type="text" value={search_query()} onInput={searching} />
      </form>
      <div class={styles.medicine_list}>
        <For each={medicines}>
          {(medicine) => (
            <>
              <Show when={medicine.is_searched}>
                <div class={styles.is_countered} onClick={add_to_counter}>
                  {medicine.name}
                </div>
              </Show>
            </>
          )}
        </For>
      </div>
    </>
  );
}

export default Search;
