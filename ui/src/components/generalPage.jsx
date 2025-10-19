import { Card } from "./productCard";
import { Link } from "react-router";
import { useProductslist } from "../hooks/useProductlist";

export function GeneralProducts() {
  const productList = useProductslist([], 'General');

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
