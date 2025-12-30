import Image from "next/image"
import Link from "next/link"
import { fetcher } from "@/lib/coingecko.actions"
import { cn, formatCurrency } from "@/lib/utils"

import React from "react"
import { CoinOverviewFallback } from "./fallback"

const CoinOverview = async () => {
  let coin
  try {
    coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
      dex_pair_format: "symbol",
    })
  } catch (error) {
    console.error("Error fetching coin overview:", error)
    return <CoinOverviewFallback />
  }
  return (
    <div id="coin-overview">
      <div className="header pt-2">
        <Image src={coin.image.large} alt={coin.name} height={56} width={56} />
        <div className="info">
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
    </div>
  )
}

export default CoinOverview
