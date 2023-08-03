<script lang="ts">
    import { showWalletSelectModal } from "$lib/stores/walletStore";
    import walletIcon from "$lib/images/wallet.svg";
</script>

<button
    class="m-2 outline outline-defaultColor hover:outline-offset-1
    ring-8 bg-blue-100 mt-2
    rounded-lg"
    on:click={() => {
        showWalletSelectModal.set(true);
    }}
    ><div class="flex flex-row">
        <img alt="wallet icon" class="h-5 w-5 m-1" src={walletIcon} />
        <p class="m-1 font-inter">Connect Wallet</p>
    </div>
</button>
