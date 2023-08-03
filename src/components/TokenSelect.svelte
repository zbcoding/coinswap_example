<script lang="ts">
    /* Token select component, a popup drawer that overlays on page to let user select a token from a list inside the component, designed heavily around the Swap component*/

    import {
        Accordion,
        Drawer,
        Modal,
        CloseButton,
        AccordionItem,
    } from "flowbite-svelte";
    import { sineIn } from "svelte/easing";
    import {
        tokenSelectDrawerHidden,
        swapInputToken,
        swapOutputToken,
        inputOrOutputSelect,
    } from "$lib/stores/componentStore";
    import { adexState } from "$lib/stores/store";
    import { Stretch } from "svelte-loading-spinners";
    import type { TokenInfo } from "alphadex-sdk-js";

    import TokenSelectDetailContent from "./TokenSelectDetailContent.svelte";

    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn,
    };

    $: inputOrOutput = $inputOrOutputSelect;

    $: adexTokenList = $adexState.tokensList;

    /*change the alphadex sdk's selected pair to the one matching the tokens in the swap. alphadex focuses on one pair at a time at the sdk level to keep data light weight*/
    function changeSelectedPair() {
        let matchValue;
        if ($swapInputToken.address && $swapOutputToken.address) {
            matchValue = $adexState.pairsList.find(
                (value) =>
                    (value.token1.address == $swapInputToken.address &&
                        value.token2.address == $swapOutputToken.address) ||
                    (value.token1.address == $swapOutputToken.address &&
                        value.token2.address == $swapInputToken.address)
            );
            if (
                matchValue &&
                $adexState.currentPairAddress != matchValue?.address
            ) {
                $adexState.currentPairAddress = matchValue?.address;
            }
        }
    }

    function closeDrawer() {
        tokenSelectDrawerHidden.set(true);
    }

    function setTokenInfo(token: TokenInfo) {
        if (inputOrOutput === "input") {
            swapInputToken.set(token);
            //cannot trade a token for same token
            if ($swapInputToken === $swapOutputToken) {
                swapOutputToken.set({} as TokenInfo);
            }
        } else if (inputOrOutput === "output") {
            swapOutputToken.set(token);
            if ($swapOutputToken === $swapInputToken) {
                swapInputToken.set({} as TokenInfo);
            }
        } else {
            console.log("Error selecting input/output token");
        }
    }
</script>

{#if !$tokenSelectDrawerHidden}
    <div
        class="modalGreyOverlay fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-[35%] z-50 transition-opacity duration-200 pointer-events-none {$tokenSelectDrawerHidden
            ? 'opacity-0'
            : 'opacity-100'}"
    >
        <!--page overlay-->
    </div>
{/if}

<div class="tokenSelectDrawer flex justify-center align-top z-[60]">
    <!--z index normally set by component-->
    <Drawer
        placement="bottom"
        backdrop={false}
        transitionType="fly"
        {transitionParams}
        bind:hidden={$tokenSelectDrawerHidden}
        id="tokenSelectionDrawer"
        class="transition:fly={{
            y: 50,
        }} in:fly out:fade duration-300 w-[60vw] p-0 max-w-max rounded-md"
    >
        <div
            class="tokenSelectionDrawerContent p-5 border outline outline-solid outline-black -outline-offset-2 bg-gradient-to-r from-dGreenAlt2 to-dGreen rounded-md relative"
        >
            <CloseButton
                name=""
                on:click={() => {
                    closeDrawer();
                }}
                class="absolute top-0 right-0 m-1 p-1 hover:outline hover:outline-black hover:-outline-offset-4 hover:bg-transparent"
            />
            {#if adexTokenList.length}
                {#each adexTokenList as token}
                    <Accordion flush>
                        <!--space between button and icon (row length)-->
                        <AccordionItem
                            class="tokenItem border-b border-black active:border-b active:border-transparent flex gap-1 sm:gap-36"
                        >
                            <!--Drawer Modal Width-->
                            <div
                                class="tokenAccordianMain flex flex-cols-2 gap-3 min-w-[100px]"
                                slot="header"
                            >
                                <!--Token Button-->

                                <button
                                    class="tokenSelectButton flex gap-3 items-center p-1 m-1 rounded-lg border border-black hover:bg-white hover:opacity-100"
                                    on:click={() => {
                                        setTokenInfo(token);
                                        changeSelectedPair();
                                        closeDrawer();
                                    }}
                                >
                                    <img
                                        class="tokenIcon w-5 h-5"
                                        alt="token icon"
                                        src={token.iconUrl}
                                    />
                                    <span
                                        class="buttonTokenSymbol font-inter text-defaultColor shadow-defaultColor"
                                        >{token.symbol}</span
                                    >
                                </button>
                            </div>
                            <div class="accordianExpandIcon" slot="arrowdown">
                                <img
                                    class="tooltipIcon w-5 h-5 hover:scale-[120%] hover:opacity-80"
                                    src="src/lib/images/info.svg"
                                    alt="info icon"
                                />
                            </div>
                            <div class="accordianShrinkIcon" slot="arrowup">
                                <img
                                    class="tooltipIcon w-5 h-5 hover:scale-[120%] hover:opacity-80"
                                    src="src/lib/images/info.svg"
                                    alt="info icon"
                                />
                            </div>
                            <!--Accordian contents-->
                            <TokenSelectDetailContent {token} />
                        </AccordionItem>
                    </Accordion>
                {/each}
            {:else}
                <div class="flex justify-center">
                    <Stretch
                        size="60"
                        color="#000000"
                        unit="px"
                        duration="0.5s"
                    />
                </div>
            {/if}
        </div>
    </Drawer>
</div>
