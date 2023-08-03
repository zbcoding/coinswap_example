<script lang="ts">
  import { adexState } from "$lib/stores/store";
  import {
    swapQuoteInfo,
    swapInputToken,
    swapOutputToken,
    riskySwapValue
  } from "$lib/stores/componentStore";
  import warnIcon from "$lib/images/warning_round.svg";
  import type { PairInfo } from "alphadex-sdk-js";

  interface QuoteInfo {
    avgPrice?: number;
    bestPrice?: number;
    exchangeFees?: number;
    exchangeFeesXrd?: number;
    fromAmount?: number;
    fromToken?: {
      address?: string;
      symbol?: string;
      name?: string;
      iconUrl?: string;
    };
    liquidityFees?: number;
    liquidityFeesXrd?: number;
    msg?: string;
    pairAddress?: string;
    platformFees?: number;
    platformFeesXrd?: number;
    slippage?: number;
    toAmount?: number;
    toToken?: {
      address?: string;
      symbol?: string;
      name?: string;
      iconUrl?: string;
    };
    totalFees?: number;
    totalFeesXrd?: number;
    worstPrice?: number;
  }

  let quoteSlippage: number | undefined;
  let quoteSlippagePercentInfo: string;
  let textColor: string;
  let warnIconOn: Boolean;
  let quoteAveragePrice: number | undefined;
  let quoteSlippagePercent;
  let quotePairName: string;
  $: {
    quoteSlippage = $swapQuoteInfo?.slippage;
    quoteSlippagePercent = $swapQuoteInfo.slippage * 100.0;
    quoteSlippagePercentInfo = `${quoteSlippagePercent.toFixed(3)}%`;
    if ($swapQuoteInfo.slippage! <= 0.01) {
      textColor = "text-green-500";
    } else if ($swapQuoteInfo.slippage! > 0.03) {
      textColor = "text-red-500";
      riskySwapValue.set(true);
    } else if ($swapQuoteInfo.slippage! <= 0.03) {
      textColor = "text-yellow-500";
    }
    quoteAveragePrice = $swapQuoteInfo.avgPrice;

    /* get quotePairName, the avg Price is shown for a pair regardless of input and output token order */
    let quotePairAddress = $swapQuoteInfo.pairAddress;
    let quotePairFound = false;
    let quotePair: PairInfo = {} as PairInfo;
    $adexState.pairsMap.forEach((value: PairInfo, key: string) => {
      if (!quotePairFound && key === quotePairAddress) {
        quotePair = value;
        quotePairFound = true;
        console.log(quotePair, "pairs");
      }
    });
    quotePairName = quotePair.name;
  }
</script>

<section
  class="quoteInfoSection text-xs font-InterNormal border-l border-black flex flex-col items-left"
>
  <div class="quoteTextInfo ml-1">
    <div class="slippageInfo flex justify-between">
      <p>Price Move:</p>
      <span class={`${textColor} ml-1`}>
        {quoteSlippagePercentInfo}
      </span>
    </div>
    <div class="avgPriceInfo flex justify-between">
      <p>Avg. Price:</p>
      <p class="ml-1">
        {quoteAveragePrice}
        {quotePairName}
      </p>
    </div>
  </div>
</section>
