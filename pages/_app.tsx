
import type { AppProps } from 'next/app'
import { ChakraProvider, Container, Flex, Stack, Text, VStack, Image, Heading, Box, Divider } from '@chakra-ui/react'

import theme from './theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={6}>
        <Container maxW={'container.xl'}
          backgroundColor={'white'}
          boxShadow={'md'}
          borderRadius={'sm'}
          marginY={4}
          padding={'4'}
        >
          <VStack marginBottom={6}>
            <Image borderRadius={9999} src='//placehold.it/128x128' alt='Placehorld' />
            <Heading>Almacen</Heading>
            <Text>El almacen de Ricuesta</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default MyApp