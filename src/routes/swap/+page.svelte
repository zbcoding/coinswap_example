<script lang="ts">
	import * as adex from "alphadex-sdk-js";
	import Swap from "../../components/Swap.svelte";
	import Chart from "../../components/Chart.svelte";
	import WalletSelectModal from "../../components/WalletSelectModal.svelte";
	import WalletComponent from "../../components/WalletComponent.svelte";
	import WalletConnectWltButton from "../../components/WalletConnectWltButton.svelte";
</script>

<svelte:head>
	<title>Swap</title>
	<meta name="description" content="Swap" />
</svelte:head>
<div class="radialBackground rounded-lg" />
<section class="radialOverlay rounded-lg">
	<div class="swapSection flex flex-col items-baseline xs:items-center">
		<div class="walletButton float-right ml-auto ">
			<WalletConnectWltButton />
		</div>

		<div
			class="swapTokens max-w-max max-h-max ring-8 ring-blue-100 bg-blue-100 ml-5 xs:ml-0 rounded mt-2"
		>
			<Swap />
		</div>
		<div class="flex justify-center w-80">
			<WalletSelectModal />
			<WalletComponent />
		</div>
		<div class="space m-5" />
		<div
			class="max-w-max ring-8 ring-green-100 bg-green-100 rounded mr-5 sm:mr-0"
		>
			<Chart showPairChange={true} showTimePeriodChange={true} />
		</div>
	</div>
</section>

<!-- <div class="absolute min-h-screen bg-gradient-radial from-defaultColor pointer-events-none max-w-screen-2xl max-h-screen-2xl -translate-y-full -z-10"></div> -->

<style>
	.radialBackground {
		@apply bg-gradient-radial;
		@apply from-dBackground to-blue-100;
		background-repeat: no-repeat;
		background-attachment: scroll;
		background-size: cover;
		min-height: 85vh;
		width: 95vw;
		color: #060f8f8f;
		z-index: -60;
		overflow: auto;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
		position: relative;
	}
	.radialOverlay {
		position: absolute;
		width: 95vw;
		height: 95vh;
		opacity: 0.8;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
		overflow: hidden;
	}
</style>
