import { ImpactFeedbackStyle } from 'expo-haptics'
import React, { useCallback, useState } from 'react'
import { Keyboard } from 'react-native'
import { useAppTheme } from 'src/app/hooks'
import { TouchableArea } from 'src/components/buttons/TouchableArea'
import { InlineNetworkPill } from 'src/components/Network/NetworkPill'
import { Text } from 'src/components/Text'
import TokenWarningModal from 'src/components/tokens/TokenWarningModal'
import WarningIcon from 'src/components/tokens/WarningIcon'
import { TokenOption } from 'src/components/TokenSelector/types'
import { useTokenWarningDismissed } from 'src/features/tokens/safetyHooks'
import { Flex } from 'ui/src'
import { formatNumber, formatUSDPrice, NumberType } from 'utilities/src/format/format'
import { TokenLogo } from 'wallet/src/components/CurrencyLogo/TokenLogo'
import { SafetyLevel } from 'wallet/src/data/__generated__/types-and-hooks'
import { shortenAddress } from 'wallet/src/utils/addresses'
import { getSymbolDisplayText } from 'wallet/src/utils/currency'

interface OptionProps {
  option: TokenOption
  showNetworkPill: boolean
  showWarnings: boolean
  onPress: () => void
  showTokenAddress?: boolean
}

function _TokenOptionItem({
  option,
  showNetworkPill,
  showWarnings,
  onPress,
  showTokenAddress,
}: OptionProps): JSX.Element {
  const theme = useAppTheme()

  const { currencyInfo, quantity, balanceUSD } = option
  const { currency, currencyId, safetyLevel, logoUrl } = currencyInfo

  const [showWarningModal, setShowWarningModal] = useState(false)
  const { tokenWarningDismissed, dismissWarningCallback } = useTokenWarningDismissed(currencyId)

  const onPressTokenOption = useCallback(() => {
    if (
      showWarnings &&
      (safetyLevel === SafetyLevel.Blocked ||
        ((safetyLevel === SafetyLevel.MediumWarning || safetyLevel === SafetyLevel.StrongWarning) &&
          !tokenWarningDismissed))
    ) {
      Keyboard.dismiss()
      setShowWarningModal(true)
      return
    }

    onPress()
  }, [showWarnings, safetyLevel, tokenWarningDismissed, onPress])

  const onAcceptTokenWarning = useCallback(() => {
    dismissWarningCallback()
    setShowWarningModal(false)
    onPress()
  }, [dismissWarningCallback, onPress])

  return (
    <>
      <TouchableArea
        hapticFeedback
        hapticStyle={ImpactFeedbackStyle.Light}
        opacity={showWarnings && safetyLevel === SafetyLevel.Blocked ? 0.5 : 1}
        testID={`token-option-${currency.chainId}-${currency.symbol}`}
        onPress={onPressTokenOption}>
        <Flex
          row
          alignItems="center"
          gap="$spacing8"
          justifyContent="space-between"
          py="$spacing12">
          <Flex row shrink alignItems="center" gap="$spacing12">
            <TokenLogo
              chainId={currency.chainId}
              symbol={currency.symbol}
              url={currencyInfo.logoUrl ?? undefined}
            />
            <Flex shrink alignItems="flex-start" gap="$none">
              <Flex centered row gap="$spacing8">
                <Flex shrink>
                  <Text color="neutral1" numberOfLines={1} variant="bodyLarge">
                    {currency.name}
                  </Text>
                </Flex>
                {(safetyLevel === SafetyLevel.Blocked ||
                  safetyLevel === SafetyLevel.StrongWarning) && (
                  <WarningIcon
                    height={theme.iconSizes.icon16}
                    safetyLevel={safetyLevel}
                    strokeColorOverride="neutral3"
                    width={theme.iconSizes.icon16}
                  />
                )}
              </Flex>
              <Flex centered row gap="$spacing8">
                <Text color="neutral2" numberOfLines={1} variant="subheadSmall">
                  {getSymbolDisplayText(currency.symbol)}
                </Text>
                {!currency.isNative && showTokenAddress && (
                  <Flex shrink gap="$none">
                    <Text color="neutral3" numberOfLines={1} variant="subheadSmall">
                      {shortenAddress(currency.address)}
                    </Text>
                  </Flex>
                )}
                {showNetworkPill && <InlineNetworkPill chainId={currency.chainId} />}
              </Flex>
            </Flex>
          </Flex>

          {quantity && quantity !== 0 ? (
            <Flex alignItems="flex-end" gap="$none">
              <Text variant="bodyLarge">{formatNumber(quantity, NumberType.TokenTx)}</Text>
              <Text color="neutral2" variant="subheadSmall">
                {formatUSDPrice(balanceUSD)}
              </Text>
            </Flex>
          ) : null}
        </Flex>
      </TouchableArea>

      {showWarningModal ? (
        <TokenWarningModal
          isVisible
          currencyId={currencyId}
          safetyLevel={safetyLevel}
          tokenLogoUrl={logoUrl}
          onAccept={onAcceptTokenWarning}
          onClose={(): void => setShowWarningModal(false)}
        />
      ) : null}
    </>
  )
}

export const TokenOptionItem = React.memo(_TokenOptionItem)
