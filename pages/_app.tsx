
import type { AppProps } from 'next/app'
// pages/_app.js
import { ChakraProvider, Container, Flex, Stack, Text } from '@chakra-ui/react'

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ChakraProvider>
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