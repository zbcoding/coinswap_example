<script lang="ts">
    import * as adex from "alphadex-sdk-js";
    import { adexState } from "$lib/stores/store";
    import {
        tokenSelectDrawerHidden,
        swapInputToken,
        swapOutputToken,
        swapInputTokenAmount,
        swapOutputTokenAmount,
        inputOrOutputSelect,
        swapQuoteInfo,
        swapMaxSlippage,
        riskySwapValue,
    } from "$lib/stores/componentStore";
    import {
        showWalletSelectModal,
        swapTxManifest,
        walletAccountAddress,
        walletSelectedName,
    } from "$lib/stores/walletStore";
    import { Button, Modal } from "flowbite-svelte";
    import { platformBadgeId, platformFee } from "$lib/stores/appStore";

    let showWarningModal = false;

    function swapOrConnect() {
        console.log($walletAccountAddress, $walletSelectedName);
        if ($walletSelectedName.length > 2 && $walletAccountAddress) {
            checkSwapValues();
        } else {
            showWalletSelectModal.set(true);
        }
    }
    function checkSwapValues() {
        if ($riskySwapValue) {
            showWarningModal = true;
        } else {
            startSwap();
        }
    }
    function continueSwap() {
        //User says "Yes" on swap warn modal
        showWarningModal = false;
        startSwap();
    }
    let txManifest: any;
    async function startSwap(): Promise<any> {
        console.log("swapstart");
        console.log(
            $swapInputToken.address,
            $swapInputTokenAmount,
            $swapOutputToken.address,
            $swapMaxSlippage,
            $platformBadgeId,
            $walletAccountAddress as string
        );
        if (
            !!$swapInputToken.address &&
            !!$swapInputTokenAmount &&
            !!$swapOutputToken.address &&
            !!$swapMaxSlippage &&
            !!$platformBadgeId &&
            !!($walletAccountAddress as string)
        ) {
            txManifest = await adex.createSwapTx(
                $swapInputToken.address,
                $swapInputTokenAmount,
                $swapOutputToken.address,
                $swapMaxSlippage,
                $platformBadgeId,
                $platformFee,
                $walletAccountAddress as string
            );
            console.log("txManifest", txManifest);
            swapTxManifest.set(txManifest);
        }
        return txManifest;
    }
</script>

<div class="swapButton m-2">
    <button
        on:click={() => {
            swapOrConnect();
        }}
        class="smoothFillingButton w-24"
    >
        {#if $walletSelectedName.length > 2 && $walletAccountAddress}
            <span class="smoothFillingButton-text font-InterNormal">Swap</span>
        {:else}
            <span class="smoothFillingButton-text font-InterNormal"
                >Connect</span
            >
        {/if}
        <div class="smoothFillingButtonFillContainer" />
    </button>

    <Modal
        bind:open={showWarningModal}
        placement="center"
        backdropClass={"bg-opacity-100"}
        size="xs"
        autoclose
        outsideclose
    >
        <div class="modalContent text-center bg-white bg-opacity-100">
            <svg
                aria-hidden="true"
                class="mx-auto mb-4 w-14 h-14 text-red-500 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <h3 class="mb-5 text-lg font-Inter text-black dark:text-gray-400">
                One of the trade values (e.g. slippage) may be too large or too
                small, are you sure you want to continue?
            </h3>
            <div class="font-inter text-black">
                <Button
                    class="border m-2 p-1 border-defaultColor hover:bg-defaultColor hover:bg-opacity-30"
                    on:click={() => {
                        continueSwap();
                    }}>Yes, I'm sure</Button
                >
                <Button
                    class="border m-2 p-1 border-defaultColor hover:bg-defaultColor hover:bg-opacity-30"
                    >No, cancel</Button
                >
            </div>
        </div>
    </Modal>
</div>
<div
    class="modalGreyOverlay fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-[35%] z-[10] transition-opacity duration-200 {!showWarningModal
        ? 'hidden'
        : 'visible'}"
>
    <!--page overlay-->
</div>

<style>
    :global([aria-label="Close modal"]) {
        /* Your styles here */
        opacity: 0;
        visibility: hidden;
    }

    .modalContent {
        background-color: white;
        opacity: 1;
    }

    /*smooth filling button*/
    .smoothFillingButton {
        position: relative;
        border-radius: 100vw;
        background-color: #052cc0;
        font-family: "Inter", serif;
        color: #fafafa;
        border: solid 5px rgba(250, 250, 250, 0.3);
        overflow: hidden;
        cursor: pointer;
        transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        -webkit-mask-image: -webkit-radial-gradient(white, black);
    }

    .smoothFillingButton .smoothFillingButton-text {
        position: relative;
        z-index: 10;
    }

    .smoothFillingButton .smoothFillingButtonFillContainer {
        position: absolute;
        left: -100;
        top: 100;
        top: 50%;
        width: 100%;
        padding-bottom: 100%;
        transform: translateY(-50%) rotate(180deg);
    }

    .smoothFillingButton .smoothFillingButtonFillContainer::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #00ab84;
        border-radius: 30%;
        transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        transform: translateY(100%);
    }

    .smoothFillingButton:hover {
        border-color: #052cc0;
        /* transform: translateY(-4px); */
    }

    .smoothFillingButton:hover .smoothFillingButtonFillContainer {
        transform: translateY(-50%) rotate(0);
    }

    .smoothFillingButton:hover .smoothFillingButtonFillContainer::after {
        transform: translateY(0);
    }
    /* end smooth filling button */
</style>
