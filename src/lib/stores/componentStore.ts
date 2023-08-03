/* component operation and data exchange */
import { writable, type Writable } from "svelte/store";
import type { TokenInfo } from "alphadex-sdk-js";


export const tokenSelectDrawerHidden = writable(true);
export const swapInputToken = writable({} as TokenInfo | undefined);
export const swapOutputToken = writable({} as TokenInfo | undefined);
export const inputOrOutputSelect = writable("");
export const swapInputTokenAmount = writable({} as number | undefined);
export const swapOutputTokenAmount = writable({} as number | undefined);

export const swapQuoteInfo = writable({} as any);

export const swapMaxSlippage = writable(100);


//basically same as $adexState.currentPairAddress
export const chartViewingTokenPair = writable({} as any);

export const riskySwapValue = writable(false);