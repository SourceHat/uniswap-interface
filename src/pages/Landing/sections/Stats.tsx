import { useInView } from 'react-intersection-observer'
import styled, { useTheme } from 'styled-components'

import { Body1, Box, Button, H2 } from '../components/Generics'
import { ArrowRightCircle } from '../components/Icons'
import { StatCard } from '../components/StatCard'

const copy = `The Uniswap platform is powered by the Uniswap protocol. The largest, most trusted decentralized crypto
          exchange on Ethereum. Uniswap is available on 7+ additional EVM compatible chains and governed by a global
          community.`

export function Stats() {
  const theme = useTheme()
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.25,
    triggerOnce: true,
  })

  return (
    <SectionLayout ref={ref}>
      <HideWhenSmall>
        <Layout>
          <Left>
            <Box direction="column" justify-content="space-between" height="100%">
              <H2>Trusted by millions</H2>
              <Box bottom="0" position="absolute" direction="column" maxWidth="480px" gap="24px">
                <Body1>{copy}</Body1>
                <Button as="a">
                  Learn more <ArrowRightCircle size="24px" fill={theme.neutral1} />
                </Button>
              </Box>
            </Box>
          </Left>
          <Right>
            <Cards inView={inView} />
          </Right>
        </Layout>
      </HideWhenSmall>
      <HideWhenLarge maxWidth="1328px" direction="column" gap="32px">
        <H2>Trusted by millions</H2>
        <Cards inView={inView} />
        <Body1>{copy}</Body1>
        <Button as="a">
          Learn more <ArrowRightCircle size="24px" fill={theme.neutral1} />
        </Button>
      </HideWhenLarge>
    </SectionLayout>
  )
}

const SectionLayout = styled.div`
  width: 100%;
  max-width: 1328px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  @media (max-width: 768px) {
    padding: 0 64px;
  }
  @media (max-width: 468px) {
    padding: 0 24px;
  }
`

function Cards({ inView }: { inView: boolean }) {
  return (
    <CardLayout>
      <LeftTop>
        <StatCard title="Lifetime volume" value="$1.6T" delay={0} inView={inView} />
      </LeftTop>
      <RightTop>
        <StatCard title="Assets" value="81,036" delay={0.2} inView={inView} />
      </RightTop>
      <LeftBottom>
        <StatCard title="Lifetime swappers" value="38M" delay={0.4} inView={inView} />
      </LeftBottom>
      <RightBottom>
        <StatCard title="Trades today" value="3,461" delay={0.6} inView={inView} />
      </RightBottom>
    </CardLayout>
  )
}

const HideWhenLarge = styled(Box)`
  @media (min-width: 768px) {
    display: none;
  }
`
const HideWhenSmall = styled(Box)`
  @media (max-width: 768px) {
    display: none;
  }
`

const LeftTop = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
`

const RightTop = styled.div`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 3;
`

const LeftBottom = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 5;
`

const RightBottom = styled.div`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 3;
  grid-row-end: 5;
`

const CardLayout = styled.div`
  width: 100%;
  height: 100%;

  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;

  overflow: hidden;
`

const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
`

const Left = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
  height: 100%;
`

const Right = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  height: 100%;
`
