import React from 'react'
import { Flex, StackProps } from 'ui/src'

// Fills up entire parent by default
export function GradientBackground({ children, ...rest }: StackProps): JSX.Element {
  return (
    <Flex
      bottom={0}
      gap="$none"
      left={0}
      position="absolute"
      right={0}
      top={0}
      zIndex="$background"
      {...rest}>
      {children}
    </Flex>
  )
}
