<script>
	import Header from "./Header.svelte";
	import "./styles.css";
	import "../app.css";
</script>

<section class="app flex flex-col">
	<header class="siteHeader h-1/5">
		<Header />
	</header>
	<main class="radialOverlay siteMain flex flex-col w-full max-w-64 mx-auto box-border">
		<slot />
	</main>


	<footer
		class="siteFooter flex flex-col justify-end items-center p-12 h-16 md:px-0 md:py-12"
	>
		<p class="text-sm">Alphaswap</p>
		<a
			class="w-32"
			href="https://www.radixdlt.com/blog/runs-on-radix-when-radix-wins-you-win-too"
			rel="prefetch"
		>
			<img
				class="runsOnRadixImage"
				alt="runs on radix"
				src="src/lib/images/runs_on_radix.gif"
			/>
		</a>
	</footer>
</section>

<style>

	/* .app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer p {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	} */
</style>
