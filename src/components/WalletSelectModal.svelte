<script lang="ts">
    import {
        walletSelectedName,
        showWalletSelectModal,
    } from "$lib/stores/walletStore";
    import { Button, CloseButton, Drawer, Modal } from "flowbite-svelte";
    import ConnectWalletButtonXidar from "./WalletXidar.svelte";
    import ConnectWalletButtonZ3us from "./WalletZ3us.svelte";

    //load value from store, then set on change
    $: hideWalletSelect = !$showWalletSelectModal;
    $: showWalletSelectModal.set(!hideWalletSelect);

    function closeDrawer() {
        showWalletSelectModal.set(false);
    }

    function selectWallet(name: string) {
        walletSelectedName.set(name);
        console.log($walletSelectedName);
        closeDrawer();
    }
</script>

{#if $showWalletSelectModal}
    <div
        class="walletSelectDrawer fixed inset-0 flex items-center justify-center z-[80]"
    >
        <div
            class="absolute inset-0 bg-gray-800 {hideWalletSelect
                ? 'opacity-0 hidden'
                : 'opacity-50'}"
        />

        <!--z index normally set by component-->
        <Drawer
            placement="bottom"
            backdrop={false}
            transitionType="fly"
            bind:hidden={hideWalletSelect}
            id="walletSelectionDrawer"
            class="fixed transition:fly={{
                y: 50,
            }} in:fly out:fade duration-300 w-[60vw] p-0 rounded-md max-w-max"
        >
            <div
                class="tokenSelectionDrawerContent p-5 border outline outline-solid outline-black -outline-offset-2 bg-gradient-to-r from-white to-slate-100 rounded-md relative"
            >
                <CloseButton
                    name=""
                    on:click={() => {
                        closeDrawer();
                    }}
                    class="absolute top-0 right-0 m-1 p-1 hover:outline hover:outline-black hover:-outline-offset-4 hover:bg-transparent"
                />
                <h2 class="m-2 flex justify-center">
                    Choose your Radix Wallet:
                </h2>
                <div class="flex flex-col mt-2 font-inter">
                    <Button
                        on:click={() => {
                            selectWallet("xidar");
                        }}
                        class="border-2 border-defaultColor border-opacity-80 hover:border-2 hover:border-defaultColor hover:bg-defaultColor hover:bg-opacity-30 m-1"
                    >
                        <h2 class="m-1">Xidar Wallet</h2>
                    </Button>
                    <Button
                        disabled
                        class="border border-defaultColor border-opacity-30 hover:border hover:border-defaultColor hover:bg-defaultColor hover:bg-opacity-30 m-1"
                    >
                        <h2 class="m-1">Z3us Wallet (Soon)</h2>
                    </Button>
                </div>
            </div>
        </Drawer>
    </div>
{/if}
