import type {Product} from "./components/types";

import React, {useRef, useState} from "react";
import {Button, Flex, Grid, Image, Link, Stack, Text, useDisclosure} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {GetStaticProps} from "next";
import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion";

import api from "./components/Products/api";

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
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

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

  const handleRemoveProductCart = (value: number) => {
    const newCart = [...cart];

    newCart.splice(value, 1);
    setCart(newCart);
  };

  React.useEffect(() => {
    if (btnRef.current) {
      btnRef.current.focus();
    }
  }, []);

  return (
    <AnimateSharedLayout>
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
              <Stack marginBottom={4} spacing={1}>
                <Image
                  alt={product.title}
                  as={motion.img}
                  borderRadius={"md"}
                  cursor={"pointer"}
                  layoutId={product.image}
                  maxHeight={"128px"}
                  objectFit="cover"
                  padding={2}
                  src={product.image}
                  onClick={() => setSelectImage(product.image)}
                />
                <Text>{product.title}</Text>
                <Text color={"green.500"} fontSize={"sm"} fontWeight={"500"}>
                  ${product.price}
                </Text>
              </Stack>
              <Button
                colorScheme={"primary"}
                onClick={() => setCart((cart) => cart.concat(product))}
              >
                Agregar
              </Button>
            </Flex>
          ))}
        </Grid>
        <AnimatePresence>
          {Boolean(cart.length) && (
            <Flex
              alignItems={"center"}
              animate={{scale: 1}}
              as={motion.div}
              bottom={0}
              exit={{scale: 0}}
              initial={{scale: 0}}
              justifyContent={"center"}
              padding={4}
              position={"sticky"}
            >
              <Button ref={btnRef} colorScheme="whatsapp" onClick={onOpen}>
                Ver Carrito ({cart.length} productos)
              </Button>
            </Flex>
          )}
        </AnimatePresence>

        <Drawer finalFocusRef={btnRef} isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Carrito ({cart.length} productos)</DrawerHeader>

            <DrawerBody>
              {cart.map((car, index) => (
                <Flex key={index}>
                  <Stack spacing={1}>
                    <Text paddingY={2}>
                      {`${car.title} - $${car.price}`}{" "}
                      <Button
                        height={"30px"}
                        width={"30px"}
                        onClick={() => handleRemoveProductCart(index)}
                      >
                        X
                      </Button>
                    </Text>
                  </Stack>
                </Flex>
              ))}
              <Flex
                alignItems={"center"}
                backgroundColor={"gray.100"}
                borderRadius={"lg"}
                bottom={0}
                justifyContent={"center"}
                padding={4}
                position={"sticky"}
                width={"100%"}
              >
                <Text fontSize={28} fontWeight={700}>
                  Total: {parseCurrency(cart.reduce((total, car) => total + car.price, 0))}
                </Text>
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Button mr={3} variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                isExternal
                as={Link}
                colorScheme={"whatsapp"}
                href={`https://wa.me/5352040404?text=${encodeURIComponent(text)}`}
              >
                Comprar por Whatsapp
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Stack>
      <AnimatePresence>
        {selectImage && (
          <Flex
            key={"backdrop"}
            alignItems={"center"}
            as={motion.div}
            backgroundColor={"rgba(0,0,0,0.5)"}
            height={"100%"}
            justifyContent="center"
            layoutId={selectImage}
            left={0}
            position="fixed"
            top="0"
            width={"100%"}
            onClick={() => setSelectImage(null)}
          >
            <Image key={"image"} alt="Image" maxHeight={"300px"} src={selectImage} />
          </Flex>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
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
