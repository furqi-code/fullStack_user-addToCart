import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";

export function OpenItem() {
  const [item, setItem] = useState(null);
  const { categoryName, productId } = useParams();
  console.log("category - ", categoryName);
  console.log("product_id - ", productId);

  // this component has been made just to see the Details of the Product without user logged in
  // useEffect runs after initial render
  const fallbackProduct = {
    img: null,
    name: "No product",
    description: "No description available",
    stock: 0,
    quantity: 0,
    MRP: 0,
    discount: 0,
    product_id: null,
  };
  const product = item || fallbackProduct;
  const bill = product.quantity * (product.MRP - (product.discount / 100) * product.MRP);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:1111/products/oneItem`,
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
      params: { categoryName, productId },
    })
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(`couldnt get products of ${categoryName} page`, err);
      });
  }, []);

  return (
    <>
      <div
        className="flex justify-center items-center mb-4"
        style={{ width: "370px" }}
      >
        <Link to={`/${categoryName}`} className="myBtn">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9312/9312240.png"
            alt=""
            className="h-12"
          />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-14 p-8 mt-10 max-w-4xl mx-auto">
        <div className="max-w-xs md:max-w-sm mx-auto">
          <img
            src={product.img}
            alt={product.name || "No product"}
            className="w-150 object-contain"
          />
        </div>
        <div>
          <p className="text-lg">
            {product.description || "No description available"}
          </p>
          {/* <div className="flex justify-between items-center">
          <p className="mt-1">Quantity : </p>
          <div className="quantity" style={{ width: "90px" }}>
            <button
              className="myBtn"
              onClick={async () => {
                if (product.product_id) await decreaseQnty(product.product_id);
              }}
            ></button>
            <label>{product.quantity}</label>
            <button
              className="myBtn"
              onClick={async () => {
                if (product.product_id) await increaseQnty(product.product_id);
              }}
            ></button>
          </div>
          </div> */}
          <Stack className="mt-1">
            <Rating
              name="half-rating-read"
              defaultValue={Number((Math.random() * 5).toFixed(1))}
              precision={0.5}
              readOnly
            />
          </Stack>
          <p className="mt-1">
            Name : <span className="ms-1">{product.name}</span>
          </p>
          <p className="mt-1">
            Stock : <span className="ms-1">{product.stock}</span>
          </p>
          <s className="mt-1">MRP : ${product.MRP.toFixed(2)}</s>
          <p className="mt-1">
            Discount :
            <span className="text-red-400 text-lg ms-2">
              -{product.discount}%
            </span>
          </p>
          <div className="flex justify-between items-center">
            <p>
              Bill :
              <span className="text-green-500 text-xl ms-2">
                ${bill.toFixed(2)}
              </span>
            </p>
            {/* <button
            className="myBtn"
            onClick={async () => {
              if (product.product_id) await removefromCart(product.product_id);
            }}
          >
            <img
              src="https://png.pngtree.com/png-clipart/20210310/original/pngtree-silver-trash-bin-clipart-png-image_5947991.jpg"
              alt="Trash"
              className="h-10"
            />
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
