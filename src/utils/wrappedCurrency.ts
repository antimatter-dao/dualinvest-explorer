import { Currency, CurrencyAmount, ETHER, Token, TokenAmount, WETH } from '../constants/token'
import { ChainId } from '../constants/chain'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency === ETHER && WETH[chainId]
    ? WETH[chainId]
    : currency instanceof Token
    ? currency
    : undefined
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token): Currency {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (WETH[token.chainId] && token.equals(WETH[token.chainId]!)) return ETHER
  return token
}
