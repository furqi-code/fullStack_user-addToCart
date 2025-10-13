import axios from "axios";
import { useReducer, createContext, useEffect } from "react";

export const ProductContext = createContext({
  productList: [],
  wishlist: [],
  handlePageProducts: () => {},
  addToCart: () => {},
  removefromCart: () => {},
  increaseQnty: () => {},
  decreaseQnty: () => {},
  addItem: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "getProductList":
      return {
        ...state,
        productList: action.products,
      };

    case "collectItems":
      return {
        ...state,
        wishlist: [...state.wishlist, action.selectedItem],
      };

    case "showSelectedPage":
      return {
        ...state,
        showCurrentPage: action.showPage,
      };

    case "removeBagItem":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.product_id
        ),
      };

    case "increaseQnty":
      return {
        ...state,
        wishlist: state.wishlist.map((item) => {
          if (item.id === action.product_id) {
            if (item.quantity < item.stock) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              alert(
                "We are out of Stock for " +
                  `${item.name}`.toUpperCase() +
                  " item"
              );
              return item;
            }
          } else {
            return item;
          }
        }),
      };

    case "decreaseQnty":
      const updatedWishlist = state.wishlist
        .map((item) => {
          if (item.id === action.product_id) {
            if (item.quantity === 1) {
              return null;
            } else {
              return { ...item, quantity: item.quantity - 1 };
            }
          }
          return item;
        })
        .filter((item) => item !== null);

      return {
        ...state,
        wishlist: updatedWishlist,
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function ProductContextProvider({ children }) {
  const [flipkart, dispatch] = useReducer(reducer, {
    productList: [], // calling api to get productList
    wishlist: [],
  });
  console.log("wishlist Array \n", flipkart.wishlist);

  const collectItems = (id) => {
    let selectedItem = flipkart.productList.find(
      (product) => product.id === id
    );
    let alreadyinBag = flipkart.wishlist.find(
      (items) => items.id === selectedItem.id
    );
    if (!alreadyinBag) {
      dispatch({
        type: "collectItems",
        selectedItem,
      });
    }
  };

  const removeBagItem = (product_id) => {
    dispatch({
      type: "removeBagItem",
      product_id,
    });
  };

  const increaseQnty = (product_id) => {
    dispatch({
      type: "increaseQnty",
      product_id,
    });
  };

  const decreaseQnty = (product_id) => {
    dispatch({
      type: "decreaseQnty",
      product_id,
    });
  };

  const addItem = (product) => {
    axios({
      method: "POST",
      url: "http://localhost:1111/products",
      data: {
        product,
      },
    })
    .then((response) => {
      console.log("Product added:", response.data);
      // showSelectedPage(product.category); // not rendering that particular page
    })
    .catch((err) => {
      console.log(`couldnt insert this product ${product.name}`, err);
    });
  }

  const handlePageProducts = (category) => {
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

  return (
    <ProductContext
      value={{
        productList: flipkart.productList,
        wishlist: flipkart.wishlist,
        handlePageProducts: handlePageProducts,
        addToCart: collectItems,
        removefromCart: removeBagItem,
        increaseQnty: increaseQnty,
        decreaseQnty: decreaseQnty,
        addItem: addItem,
      }}
    >
      {children}
    </ProductContext>
  );
}
