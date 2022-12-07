import React from 'react'
import { useTranslation } from 'react-i18next'
import { ListRenderItemInfo, SectionList, SectionListData } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { AddressDisplay } from 'src/components/AddressDisplay'
import { TouchableArea } from 'src/components/buttons/TouchableArea'
import { AnimatedFlex } from 'src/components/layout'
import { Loader } from 'src/components/loading'
import { SearchableRecipient } from 'src/components/RecipientSelect/types'
import { Text } from 'src/components/Text'

interface RecipientListProps {
  sections: SectionListData<SearchableRecipient>[]
  onPress: (recipient: string) => void
}

export function RecipientList({ onPress, sections }: RecipientListProps) {
  const renderItem = ({ item }: ListRenderItemInfo<SearchableRecipient>) => (
    <AnimatedFlex entering={FadeIn} exiting={FadeOut} py="sm">
      <RecipientRow recipient={item} onPress={onPress} />
    </AnimatedFlex>
  )

  return (
    <SectionList
      keyExtractor={key}
      keyboardShouldPersistTaps="always"
      renderItem={renderItem}
      renderSectionHeader={SectionHeader}
      sections={sections}
    />
  )
}

function SectionHeader(info: { section: SectionListData<SearchableRecipient> }) {
  return (
    <AnimatedFlex backgroundColor="background1" entering={FadeIn} exiting={FadeOut} py="xs">
      <Text color="textSecondary" variant="subheadSmall">
        {info.section.title}
      </Text>
    </AnimatedFlex>
  )
}

function key(recipient: SearchableRecipient) {
  return `recipient-${recipient.address}`
}

interface RecipientProps {
  recipient: SearchableRecipient
  onPress: (recipient: string) => void
}

export function RecipientRow({ recipient, onPress }: RecipientProps) {
  return (
    <TouchableArea onPress={() => onPress(recipient.address)}>
      <AddressDisplay address={recipient.address} size={35} />
    </TouchableArea>
  )
}

export function RecipientLoadingRow() {
  const { t } = useTranslation()
  return (
    <AnimatedFlex entering={FadeIn} exiting={FadeOut} mx="xs">
      <Text color="textTertiary" variant="bodySmall">
        {t('Search Results')}
      </Text>
      <Loader.Token />
    </AnimatedFlex>
  )
}
