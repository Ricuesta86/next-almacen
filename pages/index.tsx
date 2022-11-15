import { Box, Grid, Stack, Text } from "@chakra-ui/react"
import { GetStaticProps } from "next"
import api from "./Products/api"

import type {Product} from './Products/types'

interface Props {
  products:Product [] 
}

 const Home:React.FC<Props> = ({products} )=> {
  return <Grid gridGap={6} templateColumns={'repeat(auto-fill, minmax(240px, 1fr))'}>
    {products.map(product => <Stack  background={'gray.100'}	key={product.id}>
      <Text>{product.title}</Text>
    </Stack>)}
  </Grid>
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