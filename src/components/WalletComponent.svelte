<script lang="ts">
    import {
        walletSelectedName,
        walletAccountAddress,
    } from "$lib/stores/walletStore";
    import ConnectWalletButtonZ3us from "./WalletZ3us.svelte";
    import ConnectWalletButtonXidar from "./WalletXidar.svelte";
    $: {
        $walletSelectedName;
    }
</script>

<div class="flex flex-col">
    <ConnectWalletButtonXidar />
    <ConnectWalletButtonZ3us />
</div>
