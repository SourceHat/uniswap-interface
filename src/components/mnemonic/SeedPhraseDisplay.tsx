import { addScreenshotListener } from 'expo-screen-capture'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PrimaryButton } from 'src/components/buttons/PrimaryButton'
import { Flex } from 'src/components/layout/Flex'
import { HiddenMnemonicWordView } from 'src/components/mnemonic/HiddenMnemonicWordView'
import { MnemonicDisplay } from 'src/components/mnemonic/MnemonicDisplay'
import WarningModal from 'src/components/modals/WarningModal/WarningModal'
import { useBiometricAppSettings, useBiometricPrompt } from 'src/features/biometrics/hooks'
import { ElementName, ModalName } from 'src/features/telemetry/constants'

type Props = {
  mnemonicId: string
  onDismiss?: () => void
}

export function SeedPhraseDisplay({ mnemonicId, onDismiss }: Props) {
  const { t } = useTranslation()
  const [showScreenShotWarningModal, setShowScreenShotWarningModal] = useState(false)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [showSeedPhraseViewWarningModal, setShowSeedPhraseViewWarningModal] = useState(true)

  const onShowSeedPhraseConfirmed = () => {
    setShowSeedPhrase(true)
    setShowSeedPhraseViewWarningModal(false)
  }

  const onConfirmWarning = () => {
    if (biometricAuthRequiredForAppAccess || biometricAuthRequiredForTransactions) {
      biometricTrigger()
    } else {
      onShowSeedPhraseConfirmed()
    }
  }

  const {
    requiredForAppAccess: biometricAuthRequiredForAppAccess,
    requiredForTransactions: biometricAuthRequiredForTransactions,
  } = useBiometricAppSettings()
  const { trigger: biometricTrigger } = useBiometricPrompt(onShowSeedPhraseConfirmed)

  useEffect(() => {
    const listener = addScreenshotListener(() => setShowScreenShotWarningModal(showSeedPhrase))
    return () => listener?.remove()
  }, [showSeedPhrase])

  // when warning modal is not confirmed or closed we need to close this screen
  useEffect(() => {
    if (!showSeedPhrase && !showSeedPhraseViewWarningModal) {
      onDismiss && onDismiss()
    }
  }, [onDismiss, showSeedPhrase, showSeedPhraseViewWarningModal])

  return (
    <>
      {showSeedPhrase ? (
        <Flex grow alignItems="stretch" justifyContent="space-evenly" mt="md">
          <Flex grow mx="md" my="sm">
            <MnemonicDisplay mnemonicId={mnemonicId} />
          </Flex>
          <Flex justifyContent="center">
            <PrimaryButton
              alignSelf="stretch"
              borderRadius="md"
              label={t('Hide recovery phrase')}
              name={ElementName.Next}
              py="md"
              testID={ElementName.Next}
              textVariant="largeLabel"
              variant="gray"
              onPress={() => {
                setShowSeedPhrase(false)
              }}
            />
          </Flex>
        </Flex>
      ) : (
        <HiddenMnemonicWordView />
      )}

      <WarningModal
        caption={t(
          'Please only view your recovery phrase in a private place. Anyone who knows your recovery phrase can access your wallet and funds.'
        )}
        closeText={t('Go back')}
        confirmText={t('View phrase')}
        hideHandlebar={true}
        isDismissible={false}
        isVisible={showSeedPhraseViewWarningModal}
        modalName={ModalName.ViewSeedPhraseWarning}
        title={t('Be careful')}
        onClose={() => {
          setShowSeedPhraseViewWarningModal(false)
        }}
        onConfirm={onConfirmWarning}
      />
      <WarningModal
        caption={t(
          'Storing your recovery phrase as a screenshot is easy, but it allows anyone with access to your device access to your wallet. We encourage you to delete the screenshot and write down your recovery phrase instead.'
        )}
        confirmText={t('OK')}
        isVisible={showScreenShotWarningModal}
        modalName={ModalName.ScreenshotWarning}
        title={t('Screenshots aren’t secure')}
        onConfirm={() => setShowScreenShotWarningModal(false)}
      />
    </>
  )
}
