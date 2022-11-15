import { Box, Stack } from "@chakra-ui/react"
import { GetStaticProps } from "next"

import type {Product} from './Products/types'

interface Props {
  products:Product []
}

export default function Home() {
  return (
    <Box>Holis</Box>
  )
}

export const getStaticProps:GetStaticProps =async () => {
  return {
     props:{
      products: []
     }
  }
  
}