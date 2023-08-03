<script>
	import { page } from "$app/stores";
	import logo from "$lib/images/svelte-logo.svg";
	import github from "$lib/images/github.svg";
</script>

<header>
	<div class="navLinks flex flex-row justify-center items-center">
		<nav>
			<ul class="flex font-InterNormal gap-3">
				<li
					aria-current={$page.url.pathname === "/"
						? "page"
						: undefined}
				>
					<a href="/">Home</a>
				</li>
				<li
					aria-current={$page.url.pathname === "/swap"
						? "page"
						: undefined}
				>
					<a href="/swap">Swap</a>
				</li>
				<li
					aria-current={$page.url.pathname === "/swap"
						? "page"
						: undefined}
				>
					<a href="/swap">About</a>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
</style>
