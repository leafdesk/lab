'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'
import { ClientOnly } from '@chakra-ui/react'

export function Provider(props: ColorModeProviderProps) {
  const { children, ...rest } = props
  return (
    <ClientOnly>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...rest}>{children}</ColorModeProvider>
      </ChakraProvider>
    </ClientOnly>
  )
}
