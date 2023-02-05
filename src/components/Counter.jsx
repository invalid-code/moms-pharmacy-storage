import Search from "./Search";
import { For, Show, createSignal, createEffect, createMemo } from "solid-js";
import { medicines } from "../MedicineList";

function Counter() {
  // const [received_amount, set_received_amount] = createSignal(0);
  // const [change, set_change] = createSignal(0);

  const total_sales = createMemo(() => {
    let total = 0;
    for (let i = 0; i < medicines.length; i++) {
      if (medicines[i].is_countered) {
        total += medicines[i].price;
      }
    }
    return total;
  });

  // createEffect(() => console.log("received amount", received_amount()));
  // createEffect(() => console.log("change", change()));

  const calculate_change = () => {
    set_change(received_amount() - total_sales());
  };
  return (
    <>
      <Search />
      <div class="order-list">
        <For each={medicines}>
          {(medicine) => (
            <Show when={medicine.is_countered}>
              <div>{medicine.name}</div>
            </Show>
          )}
        </For>
        <div>Total {total_sales()}</div>
        {/* <input
          type="text"
          value={received_amount()}
          onInput={(e) =>
            e.target.textContent.length > 0
              ? set_received_amount(parseInt(e.target.textContent))
              : set_received_amount(0)
          }
        />
        <button type="button" onClick={calculate_change}>
          transact
        </button>
        <div>Change: {change()}</div> */}
      </div>
    </>
  );
}

export default Counter;
