/* wallet and wallet extensions */

import { writable, type Writable } from "svelte/store";

export const walletAccountAddress: Writable<string | undefined> = writable(undefined);

//#todo change this once a button is added
export const showWalletSelectModal: Writable<boolean | undefined> = writable(true);

export const walletSelectedName = writable("");

export const xidarWalletBalances = writable({} as any);

export const swapTxManifest = writable({} as any);

