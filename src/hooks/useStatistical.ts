// import { useState, useCallback } from 'react'
// import { Axios } from 'utils/axios'
// import usePollingWithMaxRetries from './usePollingWithMaxRetries'

// interface Stat {
//   TotalNamberOfOders: number
//   CumulativeInvestmentAmount: string
//   CumulativeNamberOUsers: number
// }

// export function useStatistical() {
//   const [stat, setStat] = useState<Stat | undefined>(undefined)

//   const promiseFn = useCallback(() => Axios.get('expolerStatistical'), [])
//   const callbackFn = useCallback(r => setStat(r.data.data), [])

//   usePollingWithMaxRetries(promiseFn, callbackFn)

//   return stat
// }

import { useCallback, useState, useMemo } from 'react'
import { Axios } from 'utils/axios'
import { toLocaleNumberString } from 'utils/toLocaleNumberString'
import usePollingWithMaxRetries from './usePollingWithMaxRetries'
import { usePriceForAll } from './usePriceSet'
import { SUPPORTED_CURRENCY_SYMBOL } from 'constants/currencies'
import { ChainId } from 'constants/chain'
// import { useActiveWeb3React } from 'hooks'

type DualStatisticsType =
  | {
      [key: string]: string
      totalDeposit: string
      totalInvestAmount: string
    }
  | undefined

function replaceAll(str: string, match: string, replace: string) {
  return str.replace(new RegExp(match, 'g'), () => replace)
}

export function useDualStatistics(): DualStatisticsType {
  const indexPrices = usePriceForAll()
  const [statistics, setStatistics] = useState<DualStatisticsType>(undefined)
  // const { chainId } = useActiveWeb3React()

  const promistFn = useCallback(() => Axios.get('getDashboard', { chainId: ChainId.BSC }), [])

  const callbackFn = useCallback(r => {
    setStatistics(r.data.data)
  }, [])

  usePollingWithMaxRetries(promistFn, callbackFn, 120000)

  const result = useMemo(() => {
    if (!statistics) return undefined

    const totalDeposit = indexPrices
      ? toLocaleNumberString(
          SUPPORTED_CURRENCY_SYMBOL.reduce((acc: number, symbol: string) => {
            acc +=
              +(
                statistics[`total${symbol[0] + symbol.slice(1).toLowerCase()}Deposit` as keyof typeof statistics] ?? 0
              ) * +(indexPrices[symbol as keyof typeof indexPrices] ?? 0)
            return acc
          }, 0) + +statistics.totalUsdtDeposit,
          0
        )
      : '-'

    return { ...statistics, totalDeposit }
  }, [indexPrices, statistics])

  return result
}

export function useRecurStatistics() {
  const [statistics, setStatistics] = useState<{ totalProgress: string; totalReInvest: string } | undefined>(undefined)
  // const { chainId } = useActiveWeb3React()

  const promiseFn = useCallback(() => {
    return Axios.get('getReinDashboard', { chainId: ChainId.BSC })
  }, [])

  const callbackFn = useCallback(r => {
    if (r.data.data) {
      setStatistics(r.data.data)
    }
  }, [])

  usePollingWithMaxRetries(promiseFn, callbackFn, 120000)

  return statistics
}

export function useHomeStatistics(): { totalInvest: string; totalProgress: string } {
  const dualStatistics = useDualStatistics()
  const recurStatistics = useRecurStatistics()

  const res = useMemo(() => {
    const totalInvest =
      dualStatistics?.totalDeposit && recurStatistics?.totalReInvest
        ? toLocaleNumberString(+replaceAll(dualStatistics.totalDeposit, ',', '') + +recurStatistics.totalReInvest, 0)
        : '-'

    const totalProgress =
      dualStatistics?.totalInvestAmount && recurStatistics?.totalProgress
        ? toLocaleNumberString(+dualStatistics.totalInvestAmount + +recurStatistics.totalProgress, 0)
        : '-'
    return { totalInvest, totalProgress }
  }, [dualStatistics, recurStatistics])

  return res
}
