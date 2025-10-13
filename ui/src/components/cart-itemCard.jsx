import { useContext, useState } from "react";
import {ProductContext} from "../store/productContext"
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export function CartItem({ ...product }) {
  const { removefromCart, increaseQnty, decreaseQnty } = useContext(ProductContext);
  // let [quantity, setQuantity] = useState(1);
  let bill = product.quantity * (product.MRP - (product.discount / 100) * product.MRP);
  console.log(`Stock of ${product.name}: `, product.stock);
  return (
    <div className="flex justify-between gap-14 py-8">
      <div>
        <img src={product.img} alt={product.name} className="w-150 object-contain" />
      </div>
      <div>
        <p className="text-lg">{product.description}</p>
        <div className="flex justify-between items center">
          <p className="mt-1">Quantity : </p>
          <div class="quantity" style={{ width: "90px" }}>
            <button
              className="myBtn"
              onClick={() => {
                decreaseQnty(product.id);
                // if (quantity == 1) {
                //   removefromCart(product.id);
                // } else {
                //   setQuantity(--quantity);
                // }
              }}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2.5"
                  stroke="#47484b"
                  d="M20 12L4 12"
                ></path>
              </svg>
            </button>
            <label>{product.quantity}</label>
            <button
              className="myBtn"
              onClick={() => {
                increaseQnty(product.id);
                // if (quantity < product.stock) {
                //   setQuantity(++quantity);
                // } else {
                //   alert(
                //     "We are out of Stock for " +
                //       `${product.name}`.toUpperCase() +
                //       " item"
                //   );
                // }
              }}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2.5"
                  stroke="#47484b"
                  d="M12 4V20M20 12H4"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <Stack className="mt-1">
          <Rating
            name="half-rating-read"
            defaultValue={(Math.random() * 5).toFixed(1)}
            precision={0.5}
            readOnly
            // size="small"
          />
        </Stack>
        <p className="mt-1">
          Name : <span className="ms-1">{product.name}</span>
        </p>
        <s className="mt-1">MRP : ${product.MRP.toFixed(2)}</s>
        <p className="mt-1">
          Discount :
          <span className="text-red-400 text-lg ms-2">
            -{product.discount}%
          </span>
        </p>
        <div className="flex justify-between items center">
          <p>
            Bill :
            <span className="text-green-500 text-xl ms-2">
              ${bill.toFixed(2)}
            </span>
          </p>
          <button className="myBtn" onClick={() => removefromCart(product.id)}>
            <img
              src="https://png.pngtree.com/png-clipart/20210310/original/pngtree-silver-trash-bin-clipart-png-image_5947991.jpg"
              alt="Trash"
              className="h-10"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
