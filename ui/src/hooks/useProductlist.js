import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../store/productContext";
import axios from "axios";

export function useProductslist(initialState, category) {
  const { getWishList, isLoggedin } = useContext(ProductContext);
  const [productList, setProductlist] = useState(initialState);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/products",
      params: {
        category,
      },
    })
      .then((res) => {
        setProductlist(res.data);
      })
      .catch((err) => {
        console.log(`couldnt get products of ${category} page`, err);
      });
    if (isLoggedin) {
      getWishList();
    }
  }, [category]);

  return productList;
}
