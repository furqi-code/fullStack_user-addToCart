import { useContext } from "react";
import { Link } from "react-router";
import { ProductContext } from "../store/productContext";

export function Header() {
  const { handlePageProducts, showSelectedPage, wishlist } =
    useContext(ProductContext);
  const isLoggedin = localStorage.getItem("userDetail");
  let totalCartItem = 0;
  wishlist.forEach((item) => {
    totalCartItem += item.quantity;
  });
  return (
    <nav className="bg-white shadow-lg mb-7 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-slate-800">Amazon</div>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/Sports"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Sports
            </Link>
            <Link
              to="/Electronics"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Electronics
            </Link>
            <Link
              to="/General"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              General
            </Link>
            {!isLoggedin && (
              <Link
                to="/addItem"
                className="text-gray-700 hover:text-slate-800 transition-colors"
              >
                Add Item
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {/* <button className="text-gray-700 hover:text-slate-800 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button> */}
            <Link
              to="/cartItems"
              className="myBtn text-gray-700 hover:text-slate-800 transition-colors relative"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROdEYJWy438DWyVWOnvbw1Aydy8-VNEbQ_B592E3Pste2GYBetOTs142mx9-QOEBZ3dQc&usqp=CAU"
                alt="cart"
                className="h-10"
              />
              <span
                className={`absolute -top-2 -right-2 text-gray text-xs rounded-full h-5 w-5 flex items-center justify-center ${
                  wishlist.length && "bg-blue-200"
                }`}
              >
                {wishlist.length === 0 ? "" : totalCartItem}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
