<script lang="ts">
	import * as adex from "alphadex-sdk-js";
	import { adexState } from "../lib/stores/store";
	import PairsList from "../components/PairsList.svelte";
	import { Stretch } from "svelte-loading-spinners";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="pairsListSection flex flex-col items-center mt-1">
	<h1 class="m-1 text-blue-500 text-center">alphaswap</h1>
	<div class="text-left">
		<p>SDK Status: {$adexState.status}</p>
		{#if $adexState.status == "READY"}
			<PairsList />
		{:else}
			<Stretch size="60" color="#000000" unit="px" duration="0.5s" />
		{/if}
	</div>
</section>

<style></style>
