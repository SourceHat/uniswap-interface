import { Trans } from '@lingui/macro'
import { MAX_WIDTH_MEDIA_BREAKPOINT } from 'components/Tokens/constants'
import { HeaderRow, LoadedRow, LoadingRow } from 'components/Tokens/TokenTable/TokenRow'
import { ExploreTab } from 'constants/explore'
import { PAGE_SIZE, SparklineMap, TopToken } from 'graphql/data/TopTokens'
import { ReactNode } from 'react'
import { AlertTriangle } from 'react-feather'
import styled from 'styled-components'

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${MAX_WIDTH_MEDIA_BREAKPOINT};
  background-color: ${({ theme }) => theme.surface1};

  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.surface3};
`

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  width: 100%;
`

const NoDataDisplay = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  color: ${({ theme }) => theme.neutral2};
  font-size: 16px;
  font-weight: 535;
  align-items: center;
  padding: 0px 28px;
  gap: 8px;
`

function NoDataState({ message }: { message: ReactNode }) {
  return (
    <GridContainer>
      <HeaderRow />
      <NoDataDisplay>{message}</NoDataDisplay>
    </GridContainer>
  )
}

const LoadingRows = ({ rowCount }: { rowCount: number }) => (
  <>
    {Array(rowCount)
      .fill(null)
      .map((_, index) => {
        return <LoadingRow key={index} first={index === 0} last={index === rowCount - 1} />
      })}
  </>
)

function LoadingTable({ rowCount = PAGE_SIZE }: { rowCount?: number }) {
  return (
    <GridContainer>
      <HeaderRow />
      <DataContainer>
        <LoadingRows rowCount={rowCount} />
      </DataContainer>
    </GridContainer>
  )
}

interface TokenTableProps {
  tab: ExploreTab.Tokens
  tokens?: readonly TopToken[]
  sparklineMap: SparklineMap
  tokenSortRank: Record<string, number>
  loadingTokens: boolean
}

interface PoolTableProps {
  tab: ExploreTab.Pools
  // TODO fill with pool table args
}

interface TransactionTableProps {
  tab: ExploreTab.Transactions
  // TODO(WEB-2753): fill with transaction table args
}

interface ExploreTableProps {
  [ExploreTab.Tokens]: TokenTableProps
  [ExploreTab.Pools]: PoolTableProps
  [ExploreTab.Transactions]: TransactionTableProps
}

const EXPLORE_TABLE_ERROR_MESSAGES = {
  [ExploreTab.Tokens]: {
    ERROR: <ErrorState message={<Trans>An error occurred loading tokens. Please try again.</Trans>} />,
    NO_DATA: <NoDataState message={<Trans>No tokens found</Trans>} />,
  },
  [ExploreTab.Pools]: {
    ERROR: <ErrorState message={<Trans>An error occurred loading pools. Please try again.</Trans>} />,
    NO_DATA: <NoDataState message={<Trans>No pools found</Trans>} />,
  },
  [ExploreTab.Transactions]: {
    ERROR: <ErrorState message={<Trans>An error occurred loading transactions. Please try again.</Trans>} />,
    NO_DATA: <NoDataState message={<Trans>No transactions found</Trans>} />,
  },
}

function ErrorState({ message }: { message: ReactNode }) {
  return (
    <NoDataState
      message={
        <>
          <AlertTriangle size={16} />
          {message}
        </>
      }
    />
  )
}

export function ExploreTable({
  tab,
  tokens,
  loadingTokens,
  sparklineMap,
  tokenSortRank,
}: ExploreTableProps[ExploreTab.Tokens]): JSX.Element
export function ExploreTable({ tab }: ExploreTableProps[ExploreTab.Pools]): JSX.Element
export function ExploreTable({ tab }: ExploreTableProps[ExploreTab.Transactions]): JSX.Element
export function ExploreTable({ tab, ...args }: ExploreTableProps[ExploreTab]) {
  let loading
  let data
  let rows

  switch (tab) {
    case ExploreTab.Tokens: {
      const { tokens, loadingTokens, sparklineMap, tokenSortRank } = args as ExploreTableProps[ExploreTab.Tokens]
      loading = loadingTokens
      data = tokens
      rows = data?.map(
        (token, index) =>
          token?.address && (
            <LoadedRow
              key={token.address}
              tokenListIndex={index}
              tokenListLength={data.length}
              token={token}
              sparklineMap={sparklineMap}
              sortRank={tokenSortRank[token.address]}
            />
          )
      )
      break
    }
    case ExploreTab.Pools:
      break
    case ExploreTab.Transactions:
      break
  }

  if (loading && !data) {
    return <LoadingTable rowCount={PAGE_SIZE} />
  } else if (!data) {
    return EXPLORE_TABLE_ERROR_MESSAGES[tab].ERROR
  } else if (data?.length === 0) {
    return EXPLORE_TABLE_ERROR_MESSAGES[tab].NO_DATA
  } else {
    return (
      <GridContainer>
        <HeaderRow />
        <DataContainer>{rows}</DataContainer>
      </GridContainer>
    )
  }
}
