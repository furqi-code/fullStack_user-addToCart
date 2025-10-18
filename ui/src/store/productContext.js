import axios from "axios";
import { useReducer, createContext } from "react";

export const ProductContext = createContext({
  productList: [],
  wishlist: [],
  setIsLoggedin: () => {},
  isLoggedin: undefined,
  getProductList: () => {},
  addToCart: () => {},
  removefromCart: () => {},
  increaseQnty: () => {},
  decreaseQnty: () => {},
  addItem: () => {},
  getWishList: () => {},
  setWishList: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "activeUser":
      return {
        ...state,
        isLoggedin: action.status,
      };

    case "getProductList":
      return {
        ...state,
        productList: action.products,
      };

    case "getWishlist":
      return {
        ...state,
        wishlist: action.wishlist,
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function ProductContextProvider({ children }) {
  const [flipkart, dispatch] = useReducer(reducer, {
    productList: [], // from DB to get productList
    wishlist: [], // from DB to get user's wishlist
    isLoggedin: localStorage.getItem("userDetail") ? true : false,
  });
  console.log("wishlist Array \n", flipkart.wishlist);

  const setIsLoggedin = (status) => {
    dispatch({
      type: "activeUser",
      status, // true or false
    });
  };

  const setWishList = (emptyArr) => {
    dispatch({
      type: "getWishlist",
      wishlist: [...emptyArr],
    });
  };

  const getProductList = (category) => {
    axios({
      method: "GET",
      url: "http://localhost:1111/products",
      params: {
        category,
      },
    })
      .then((response) => {
        dispatch({
          type: "getProductList",
          products: response.data,
        });
      })
      .catch((err) => {
        console.log(`couldnt get products of ${category} page`, err);
      });
  };

  const getWishList = () => {
    axios({
      method: "GET",
      url: "http://localhost:1111/wishlist",
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
    })
      .then((getResponse) => {
        dispatch({
          type: "getWishlist",
          wishlist: getResponse.data,
        });
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  };

  const addItem = (product) => {
    // (Admin) already inserted some products through mySql db 
    axios({
      method: "POST",
      url: "http://localhost:1111/products",
      data: {
        product,
      },
    })
      .then((response) => {
        console.log("Product added:", response.data);
      })
      .catch((err) => {
        console.log(`couldnt insert this product ${product.name}`, err);
      });
  };

  const collectItems = async (product_id) => {
    try {
      if (flipkart.isLoggedin) {
        const addToCartResponse = await axios({
          method: "POST",
          url: "http://localhost:1111/wishlist",
          headers: {
            Authorization: localStorage.getItem("userDetail"),
          },
          params: {
            product_id,
          },
        });
        console.log("Product added in your Cart:", addToCartResponse.data);
        await getWishList();
      } else {
        alert("Kindly Login to add item in your cart");
      }
    } catch (err) {
      console.log(`couldnt insert this product in wishlist`, err);
    }
  };

  const removeBagItem = async (product_id) => {
    try {
      if (flipkart.isLoggedin) {
        const addToCartResponse = await axios({
          method: "DELETE",
          url: "http://localhost:1111/wishlist/eliminate",
          headers: {
            Authorization: localStorage.getItem("userDetail"),
          },
          params: {
            product_id,
          },
        });
        console.log(addToCartResponse.data);
        await getWishList();
      } else {
        alert("Kindly Login to delete item in your cart");
      }
    } catch (err) {
      console.log(`couldnt delete this product from wishlist`, err);
    }
  };

  const increaseQnty = async (product_id) => {
    try {
      if (flipkart.isLoggedin) {
        const addToCartResponse = await axios({
          method: "PATCH",
          url: "http://localhost:1111/wishlist/increase",
          headers: {
            Authorization: localStorage.getItem("userDetail"),
          },
          params: {
            product_id,
          },
        });
        console.log(addToCartResponse.data);
        await getWishList();
      } else {
        alert("Kindly Login to increase item in your cart");
      }
    } catch (err) {
      console.log(`Error while increase Qnty`, err);
      alert(err.response.data.message)
    }
  };

  const decreaseQnty = async (product_id) => {
    try {
      if (flipkart.isLoggedin) {
        const addToCartResponse = await axios({
          method: "PATCH",
          url: "http://localhost:1111/wishlist/decrease",
          headers: {
            Authorization: localStorage.getItem("userDetail"),
          },
          params: {
            product_id,
          },
        });
        console.log(addToCartResponse.data);
        await getWishList();
      } else {
        alert("Kindly Login to decrease item in your cart");
      }
    } catch (err) {
      console.log(`couldnt decrease the quantity of this product`, err);
    }
  };

  return (
    <ProductContext
      value={{
        productList: flipkart.productList,
        wishlist: flipkart.wishlist,
        isLoggedin: flipkart.isLoggedin,
        setIsLoggedin,
        setWishList,  // logout --> wishlist[]
        getProductList,
        getWishList,
        addItem,
        addToCart: collectItems,
        removefromCart: removeBagItem,
        increaseQnty,
        decreaseQnty,
      }}
    >
      {children}
    </ProductContext>
  );
}
