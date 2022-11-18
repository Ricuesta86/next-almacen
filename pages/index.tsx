import type {Product} from "./Products/types";

import React, {useState} from "react";
import {Button, Flex, Grid, Link, Stack, Text} from "@chakra-ui/react";
import {GetStaticProps} from "next";

import api from "./Products/api";

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

const Home: React.FC<Props> = ({products}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const text = React.useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(` * ${product.title} - ${parseCurrency(product.price)}\n`),
          ``,
        )
        .concat(
          `\n Total: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))} `,
        ),
    [cart],
  );

  return (
    <Stack>
      <Grid gridGap={6} templateColumns={"repeat(auto-fill, minmax(240px, 1fr))"}>
        {products.map((product) => (
          <Flex
            key={product.id}
            background={"gray.100"}
            borderRadius={"md"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            padding={4}
          >
            <Stack spacing={1}>
              <Text>{product.title}</Text>
              <Text color={"green.500"} fontSize={"sm"} fontWeight={"500"}>
                ${product.price}
              </Text>
            </Stack>
            <Button colorScheme={"primary"} onClick={() => setCart((cart) => cart.concat(product))}>
              Agregar
            </Button>
          </Flex>
        ))}
      </Grid>
      {Boolean(cart.length) && (
        <Flex
          alignItems={"center"}
          bottom={0}
          justifyContent={"center"}
          padding={4}
          position={"sticky"}
        >
          <Button
            isExternal
            as={Link}
            colorScheme={"whatsapp"}
            href={`https://wa.me/5352152326?text=${encodeURIComponent(text)}`}
          >
            Ver carrito ({cart.length} productos)
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};

export default Home;
