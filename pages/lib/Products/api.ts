import axios from "axios";
import Papa from "papaparse";

import {Product} from "../types";

const api = {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vSm4iqGGKueLSUlLYNlS--RAPg_BzQw57FqltbXSU6zKjEDgnE6hBEl9OySnOfktIFDPjOYevh5TmQB/pub?output=csv`,
        {
          responseType: "blob",
        },
      )
      .then(
        (response) =>
          new Promise<Product[]>((resolve, rejects) => {
            Papa.parse(response.data, {
              header: true,
              complete: (result) => {
                const products = result.data as Product[];

                return resolve(
                  products.map((product) => ({
                    ...product,
                    price: Number(product.price),
                  })),
                );
              },
              error: (error) => rejects(error.message),
            });
          }),
      );
  },
};

export default api;
