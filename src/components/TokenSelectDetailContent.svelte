<script lang="ts">
    /* in the token selection modal, extra info content for each token including the copy-to-clipboard function */
    import type { TokenInfo } from "alphadex-sdk-js";

    export let token: TokenInfo;

    import clipboardIcon from "$lib/images/clipboard.svg";
    import ClipboardJS from "clipboard";

    import "tippy.js/animations/perspective-subtle.css";
    import { createTippy } from "svelte-tippy";
    const tokenAddressTippy = createTippy({
        animation: "perspective-subtle",
        arrow: true,
        appendTo: () => document.body,
    });

    let addrCopyMessage = false;

    var clipboard = new ClipboardJS(".clickCopyToClipboard");
    clipboard.on("success", function (event) {
        if (event.trigger.classList.contains("tokenAddress")) {
            console.info("Action:", event.action);
            console.info("Text:", event.text);
            addrCopyMessage = true;
            setTimeout(() => {
                addrCopyMessage = false;
            }, 1000);
        }
    });
</script>

<div
    class="tokenAccordianContent m-2 text-md border-l border-white bg-opacity-50"
>
    <ul class="tokenInfo text-black m-2">
        <li class="tokenIconAndName flex gap-2 break-normal">
            <img
                class="tokenIcon w-4 h-4"
                alt="token icon"
                src={token.iconUrl}
            />
            <span class="tokenName text-sm">{token.name}</span>
            <span class="tokenSymbol text-xs break-words">
                ({token.symbol})
            </span>
        </li>
        <li class="tokenSymbol" />
        <li
            class="tokenAddress text-xs break-all clickCopyToClipboard transition ease-in-out in:fade out:fade duration-300"
            data-clipboard-text={token.address}
        >
            {#if addrCopyMessage}
                <div class="flex cursor-pointer">
                    <span>Address copied!</span><img
                        class="clipboardIcon w-5 h-5 ml-0.5 mr-0.5"
                        alt="clipboard copy icon"
                        src={clipboardIcon}
                    />
                </div>
            {:else}
                <div
                    class="flex cursor-pointer"
                    use:tokenAddressTippy={{
                        content: token.address,
                        theme: "tippyBackground",
                    }}
                >
                    <span>
                        {`${token.address
                            .toString()
                            .substring(0, 19)}...${token.address
                            .toString()
                            .slice(-5)}`}</span
                    >
                    <img
                        class="clipboardIcon w-5 h-5 ml-0.5 mr-0.5"
                        alt="clipboard copy icon"
                        src={clipboardIcon}
                    />
                </div>
            {/if}
        </li>
    </ul>
</div>

<style>
    :global(.tippy-box[data-theme="tippyBackground"]) {
        @apply py-1 px-0.5 text-xs break-all rounded-lg bg-white w-[300px];
    }
</style>
