<script lang="ts">
  import { adexState } from "$lib/stores/store";
  import { clientState, type PairInfo } from "alphadex-sdk-js";
  import { afterUpdate, onMount } from "svelte";

  function selectPair(pairAddress: string) {
    clientState.currentPairAddress = pairAddress;
  }

//   $: {
//     console.log($adexState.pairsList);
//     console.log($adexState.pairsMap)
//     console.log($adexState.status)
//     console.log($adexState.tokensList)
// }
</script>

<h3>AlphaDEX Pairs</h3>
<ul>
  {#each $adexState.pairsList as pair (pair.address)}
    <li>
      <button on:click={() => selectPair(pair.address)}>
        {pair.name}
      </button>
    </li>
  {/each}
</ul>

<h3>Information for currently selected pair</h3>
<p>Name: {$adexState.currentPairInfo.name}</p>
<p>Radix Address: {$adexState.currentPairInfo.address}</p>
<p>Last Price: {$adexState.currentPairInfo.lastPrice}</p>
<p>No of sell prices in orderbook: {$adexState.currentPairOrderbook.sells.length}</p>
<p>No of buy prices in orderbook: {$adexState.currentPairOrderbook.buys.length}</p>

