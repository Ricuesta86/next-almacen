
import type { AppProps } from 'next/app'
import { ChakraProvider, Container, Flex, Stack, Text } from '@chakra-ui/react'

import theme from './theme'

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW={'container.xl'}>
      <Flex direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Text>Lado Izquierdo</Text>
        <Text>Lado derecho</Text>
      </Flex>
      <Component {...pageProps} />        
      </Container>
    </ChakraProvider>
  )
}

export default MyApp