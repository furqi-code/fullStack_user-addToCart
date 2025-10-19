import { Card } from "./productCard";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../store/productContext";
import { Link } from "react-router";
import axios from "axios";

export function SportsProducts() {
  const { getWishList, isLoggedin } = useContext(ProductContext);
  const [productList, setProductlist] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/products",
      params: {
        category: "Sports",
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
  }, []);

  return (
    <>
      <div
        className="flex justify-center items-center mb-4"
        style={{ width: "355px" }}
      >
        <Link to="/" className="myBtn">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9312/9312240.png"
            alt=""
            className="h-12"
          />
        </Link>
      </div>
      <div className="flex justify-center align-center">
        <div class="grid grid-cols-4 gap-4">
          {productList.map((products) => (
            <div className="p-4">
              <Card {...products} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
