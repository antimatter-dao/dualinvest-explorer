import { INVEST_TYPE } from 'hooks/useOrderData'
import { ChainId } from 'constants/chain'

export interface OrderRecord {
  address: string
  amount: number
  annualRor: number
  confirmOrderHash: string
  createdAt: number
  currency: string
  deliveryPrice: string
  earn: string
  expiredAt: number
  indexPrice: string
  investStatus: number
  investCurrency: string
  isLiquidated?: string
  multiplier: number
  orderId: number
  price: string
  productId: number
  returnedAmount: string
  returnedCurrency: string
  signCount?: string
  status: string
  strikeCurrency: string
  strikePrice: number
  ts: number
  type: string
  investType: INVEST_TYPE
  chainId: ChainId
  hash?: string
}

export interface DovRecordRaw {
  orderId: number
  productId: number
  vaultAddress: string
  swapAddress: string
  otokenAddress: string
  indexPrice: string
  price: string
  amount: string
  createdAt: string
  investStatus: number
  chainId: number
  type: string
  annualRor: string
  strikePrice: string
  expiredAt: number
  multiplier: string
  investCurrency: ''
  investType: number
}
