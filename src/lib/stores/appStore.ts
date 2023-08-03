/* main application settings/constants */

import { writable } from "svelte/store";

// Platform fee (0.01) must be between 0 and 0.001
export const platformFee = writable(0.001);
//#todo get unique platformBadgeId instead of test value 1
export const platformBadgeId = writable(1);