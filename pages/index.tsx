import { Box, Button, Grid, Stack, Text } from "@chakra-ui/react"
import { GetStaticProps } from "next"
import { useState } from "react"
import api from "./Products/api"

import type {Product} from './Products/types'

interface Props {
  products:Product [] 
}

 const Home:React.FC<Props> = ({products} )=> {
  const [cart, setCart] = useState<Product[]>([])
  return(
    <Stack>
       <Grid gridGap={6} templateColumns={'repeat(auto-fill, minmax(240px, 1fr))'}>
      {products.map(product => <Stack  background={'gray.100'}	key={product.id}>
        <Text>{product.title}</Text>
        <Text>${product.price}</Text>
        <Button colorScheme={"blue"} onClick={()=>setCart(cart=>cart.concat(product))}>Agregar</Button>
      </Stack>)}
    </Grid>
    {Boolean(cart.length) && <Button>Ver carrito ({cart.length} productos)</Button>}
    </Stack>)
}

export const getStaticProps:GetStaticProps =async () => {
  const products= await api.list();
  return {
     props:{
      products
     },
     revalidate:10
  }
  
}

export default Home;