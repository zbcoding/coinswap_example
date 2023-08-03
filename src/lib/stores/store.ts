/* store for adex api */

import { derived, writable } from "svelte/store";
import * as adex from "alphadex-sdk-js";
import type { TokenInfo } from "alphadex-sdk-js";

adex.init();
export const adexState = writable(adex.clientState, function start(set) {
    const sub = adex.clientState.stateChanged$.subscribe(() => {
        set(adex.clientState)
        
        /*update xrd icon*/
        let adexTokenList: TokenInfo[] = adex.clientState.tokensList;
        let xrdTokenListElement: TokenInfo | undefined;
        if (adexTokenList.length) {
            xrdTokenListElement = adexTokenList.find(
                (coin) =>
                    coin.symbol === "XRD" &&
                    coin.address ===
                    "resource_tdx_c_1qyqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq40v2wv"
            );
        }
        if (xrdTokenListElement) {
            xrdTokenListElement.iconUrl =
                "src/lib/images/Radix_Icon_Round_200x200.svg";
        }
        set(adex.clientState);

    });

    return function stop() {
        console.log("Stopping adex clientState subscription");
        sub.unsubscribe();
    };
});