import type {AppProps} from "next/app";

import {
  ChakraProvider,
  Container,
  Text,
  VStack,
  Image,
  Heading,
  Box,
  Divider,
} from "@chakra-ui/react";

import theme from "./components/theme";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={6}>
        <Container
          backgroundColor={"white"}
          borderRadius={"sm"}
          boxShadow={"md"}
          marginY={4}
          maxW={"container.xl"}
          padding={"4"}
        >
          <VStack marginBottom={6}>
            <Image
              alt="Placehorld"
              borderRadius={9999}
              boxSize="128px"
              objectFit="cover"
              src={"./asserts/images.jpg"}
            />
            <Heading>Almacen</Heading>
            <Text>El almacen de Ricuesta</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
