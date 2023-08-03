<script lang="ts">
    import { adexState } from "$lib/stores/store";
    import {
        chartViewingTokenPair,
        swapQuoteInfo,
    } from "$lib/stores/componentStore";
    import type { Candle } from "alphadex-sdk-js";
    import * as adex from "alphadex-sdk-js";

    import { ColorType, CrosshairMode } from "lightweight-charts";
    import { onDestroy, onMount } from "svelte";
    import { Chart, CandlestickSeries } from "svelte-lightweight-charts";
    import { Stretch } from "svelte-loading-spinners";
    import { Button, Dropdown, DropdownItem, Search } from "flowbite-svelte";

    import warningIcon from "$lib/images/warning_filled.svg";

    import "tippy.js/animations/perspective-subtle.css";
    import { createTippy } from "svelte-tippy";

    export const pairWarnTippy = createTippy({
        animation: "perspective-subtle",
        arrow: true,
        content: `<div class="pairWarningTooltip bg-gray-200 text-black p-2 rounded">This chart may not match the tokens that are being swapped. Use this for reference only.</div>`,
        allowHTML: true,
        appendTo: () => document.body,
    });

    interface TokenCandle {
        time?: number | string;
        open?: number | string;
        high?: number | string;
        low?: number | string;
        close?: number | string;
    }

    export let showTimePeriodChange: Boolean = true;
    export let showPairChange: Boolean = true;

    let chartLoadingIcon = true;
    let tokenCandle: TokenCandle;
    let tokenCandleData: TokenCandle[] = [];
    $: pair = $adexState.currentPairInfo;
    $: pairsList = $adexState.pairsList;

    $: candlesList = $adexState.currentPairCandlesList;
    $: pairName = pair.name;
    $: chartWatermark = `${pairName} (${currentCandleTimePeriod})`;
    let chartTitle: string;
    let chartUpdateKeyFlag = 0;

    $: currentCandleTimePeriod = $adexState.currentCandlePeriod;

    $: {
        //detect pair changes
        pair = $adexState.currentPairInfo;
        pairName = pair.name;
        chartTitle = pair.name;
        chartWatermark = `${pairName} (${currentCandleTimePeriod})`;
        candlesList = $adexState.currentPairCandlesList;
        tokenCandleData = setupChartData(candlesList);
        if (tokenCandleData.length == 0 || pairName.length == 0) {
            chartLoadingIcon = true;
        } else {
            chartLoadingIcon = false;
        }
        if (
            $swapQuoteInfo.pairAddress &&
            pair.address != $swapQuoteInfo.pairAddress
        ) {
            showPairWarningIcon = true;
        } else {
            showPairWarningIcon = false;
        }
        chartUpdateKeyFlag += 1;
    }

    function chartCandlestickDataShouldBeUpdated(): Boolean {
        /* #TODO: add logic to only update chart if data changes and not on component loading on page */
        return candlesList.length > 0;
    }

    function setupChartData(list: Candle[]): TokenCandle[] {
        if (chartCandlestickDataShouldBeUpdated()) {
            tokenCandleData = [];
            let time, open, high, low, close;
            list.forEach((candle) => {
                /* TODO: Remove random from numbers for test data */
                function getRandom() {
                    // return 0.1 * -Math.random() * -Math.random();
                    return 0.0;
                }
                time = Math.floor(Date.parse(candle.startTime) / 1000);
                open = candle.priceOpen + getRandom();
                high = candle.priceHigh + getRandom();
                low = candle.priceLow + getRandom();
                close = candle.priceClose + getRandom();
                tokenCandle = {
                    time,
                    open,
                    high,
                    low,
                    close,
                };
                tokenCandleData.push(tokenCandle);
            });
            return tokenCandleData;
        }
        return [];
    }

    /* default chart dimensions */
    let chartHeight = 300;
    let chartWidth = 600;
    let autoSize = false;

    let screenWidth = window.innerWidth;

    function handleResize() {
        screenWidth = window.innerWidth;
        if (screenWidth < 650) {
            chartWidth = screenWidth - 100;
            chartHeight = chartWidth / 2;
            autoSize = false;
        } else if (screenWidth >= 650) {
            chartWidth = 600;
            chartHeight = 300;
            autoSize = true;
        }
    }

    onMount(() => {
        window.addEventListener("resize", handleResize);
    });

    onDestroy(() => {
        window.removeEventListener("resize", handleResize);
    });

    $: options = {
        width: chartWidth,
        height: chartHeight,
        autoSize: autoSize,
        layout: {
            background: {
                type: ColorType.Solid,
                color: "#151823",
            },
            textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
            vertLines: {
                color: "#383d4f",
            },
            horzLines: {
                color: "#383d4f",
            },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
        },
        leftPriceScale: {},
        overlayPriceScales: {},
        rightPriceScale: {
            borderColor: "rgba(197, 203, 206, 0.8)",
        },
        timeScale: {
            borderColor: "rgba(197, 203, 206, 0.8)",
            timeVisible: true,
            ticksVisible: true,
            rightOffset: 1,
            fixRightEdge: false,
            lockVisibleTimeRangeOnResize: false,
        },
        watermark: {
            visible: true,
            color: "#FFFFFF",
            text: chartWatermark,
            fontSize: 12,
            fontFamily: "Inter",
            fontStyle: "",
            horzAlign: "left",
            vertAlign: "bottom",
        },
    };

    let timeArray = adex.CandlePeriods;

    function handleChartTimeClick(event: any) {
        event.preventDefault();
        let selectedTimePeriod = event.target.id.toString();
        if (timeArray.indexOf(selectedTimePeriod) > -1) {
            adex.clientState.currentCandlePeriod = selectedTimePeriod;
            chartUpdateKeyFlag += 1;
        }
    }

    function handleChartPairClick(event: any) {
        event.preventDefault();

        let selectedPairAddress = event.target.id.toString();
        if (
            selectedPairAddress &&
            pairsList.indexOf(selectedPairAddress) >= -1 &&
            selectedPairAddress !== $adexState.currentPairAddress
        ) {
            $adexState.currentPairAddress = selectedPairAddress;
            chartViewingTokenPair.set($adexState.currentPairInfo);
            chartLoadingIcon = true; //toggled to false in reactive block
        }
    }

    let showPairWarningIcon = false;
</script>

<section class="tokenChart flex flex-col max-w-max max-h-max">
    {#if !chartLoadingIcon && !showTimePeriodChange}
        <h1 class="chartTitle font-InterNormal flex justify-center">
            {chartWatermark}
        </h1>
    {/if}
    {#if !chartLoadingIcon}
        <div class="chartHeader flex justify-center z-30 mt-1 mb-1">
            {#if showPairWarningIcon && showPairChange}
                <div
                    use:pairWarnTippy
                >
                    <img
                        class="warningIcon w-5 h-5 mr-1 flex justify-center translate-y-0.5"
                        alt="warning icon"
                        src={warningIcon}
                    />
                </div>
            {/if}
            {#if showPairChange}
                <Button
                    class="mr-2 border-2 border-defaultColor border-opacity-75 rounded hover:bg-defaultColor hover:bg-opacity-30"
                >
                    <h3 class="chartTitle font-InterNormal ml-0.5 mr-0.5">
                        {chartTitle}
                    </h3>
                </Button>
                <!--pair select-->
                <div class="chartPairInfo">
                    <Dropdown
                        class="chartPairDropdown overflow-y-auto py-1 h-48 bg-white transition-none"
                        triggeredBy=".chartTitle"
                    >
                        <div
                            slot="header"
                            class="swapSelectInfo m-1 text-xs text-gray-500 dark:text-white flex flex-row"
                        >
                            <div class="flex">
                                <img
                                    class="tooltipIcon w-4 h-4 m-0.5 opacity-50"
                                    src="src/lib/images/info.svg"
                                    alt="info icon"
                                />
                            </div>
                            <div class="m-0.5">
                                <p class="">Selecting tokens to Swap</p>
                                <p class="">will change the chart pair</p>
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <!-- <Search size="md" /> -->
                        </div>
                        {#each pairsList as pair (pair.address)}
                            <DropdownItem
                                class="flex justify-center hover:bg-defaultColor hover:bg-opacity-10 border-b border-black"
                                id={pair.address}
                                on:click={() => {
                                    handleChartPairClick(event);
                                }}>{pair.name}</DropdownItem
                            >
                        {/each}
                    </Dropdown>
                </div>
            {:else}
                <div class="mr-2">
                    <h3 class="chartTitle font-InterNormal ml-0.5 mr-0.5">
                        {chartTitle}
                    </h3>
                </div>
            {/if}
            {#if showTimePeriodChange}
                <div
                    class="currentCandleTimePeriodSelect flex font-InterNormal"
                >
                    <Button
                        class="text-xs border-2 border-defaultColor border-opacity-75 rounded hover:bg-defaultColor hover:bg-opacity-30"
                        ><h3 class="ml-0.5 mr-0.5">
                            {currentCandleTimePeriod}
                        </h3></Button
                    >
                    <!--candle time select-->
                    <Dropdown
                        placement="bottom"
                        triggeredBy=".currentCandleTimePeriodSelect"
                        class="chartTimeDropdown bg-white outline outline-1 outline-defaultColor rounded transition-none"
                    >
                        {#each timeArray as time}
                            <DropdownItem
                                class="w-10 flex justify-center hover:bg-defaultColor hover:bg-opacity-10 border-b border-black"
                                id={time}
                                on:click={() => {
                                    handleChartTimeClick(event);
                                }}>{time}</DropdownItem
                            >
                        {/each}
                    </Dropdown>
                </div>
            {/if}
        </div>
    {/if}
    <!--Chart-->
    <section class="tokenChartSection m-1">
        <div
            class={`tokenChart m-1 p-0 w-${options.width} h-${options.height} ring-4 ring-green-300 rounded-sm`}
        >
            {#key chartUpdateKeyFlag}
                {#if !chartLoadingIcon}
                    <Chart {...options}>
                        <CandlestickSeries
                            data={tokenCandleData}
                            upColor="#24ab96"
                            downColor="#f9545f"
                            borderDownColor="#000000"
                            borderUpColor="#000000"
                            wickDownColor="#f9545f"
                            wickUpColor="#24ab96"
                        />
                    </Chart>
                {:else}
                    <Stretch
                        size="120"
                        color="#000000"
                        unit="px"
                        duration="0.5s"
                    />
                {/if}
            {/key}
        </div>
    </section>
</section>
