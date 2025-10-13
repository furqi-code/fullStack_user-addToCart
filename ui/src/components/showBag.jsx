import { CartItem } from "./cart-itemCard";
import { useContext } from "react";
import { ProductContext } from "../store/productContext";

export function ShowBag() {
  const { wishlist, showSelectedPage } = useContext(ProductContext);
  if (wishlist.length === 0) {
    return (
      <>
        {/* <div className="flex justify-center" style={{ width: "700px" }}>
          <button className="myBtn" onClick={() => showSelectedPage("homePage")}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/9312/9312240.png"
              alt=""
              className="h-12"
            />
          </button>
        </div> */}
        <div className="flex justify-center items-center">
          <div
            id="sc-active-cart"
            data-csa-c-painter="shoppingcart"
            data-csa-c-type="widget"
            data-name="Active Cart"
            class="a-cardui sc-card-style sc-list sc-java-remote-feature celwidget sc-grid-view sc-grid-full-width sc-card-spacing-top-none"
            data-a-card-type="basic"
            data-csa-c-id="lsc3k9-730sw6-dq568c-nimwai"
            data-cel-widget="sc-active-cart"
            style={{ width: "700px" }}
          >
            <div class="a-cardui-body a-scroller-none">
              <a name="sc-anchor-active-cart" aria-hidden="true"></a>

              <div id="sc-empty-cart" class="a-row a-spacing-top-extra-large">
                <div class="a-column a-span4">
                  <img src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" />
                </div>

                <div class="a-column a-span8 a-span-last">
                  <h3 class="a-size-large a-spacing-top-base sc-your-amazon-cart-is-empty">
                    Your Amazon cart Bag is empty
                  </h3>

                  <div class="a-section a-spacing-none sc-shop-todays-deals-link">
                    <a
                      class="a-link-normal"
                      href="/gp/goldbox/ref=cart_empty_deals"
                    >
                      Shop today's deals
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  let subTotalBill = 0,
    totalCartItem = 0,
    totalBill = 0;
  wishlist.forEach((product) => {
    totalCartItem += product.quantity;
    let bill =
      product.quantity * (product.MRP - (product.discount / 100) * product.MRP);
    subTotalBill += bill;
  });
  const GST = (18 / 100) * subTotalBill;
  totalBill = subTotalBill + GST;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* <div className="flex items-center justify-between">
        <div>
          <button className="myBtn" onClick={() => showSelectedPage("homePage")}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/9312/9312240.png"
              alt="Back"
              className="h-12"
            />
          </button>
        </div>
        <div className="flex-grow text-center">
          <h3 className="text-lg font-small">
            Your Bag has {wishlist.length} item
            {wishlist.length !== 1 ? "s" : ""}
          </h3>
        </div>
        <div style={{ width: "48px" }}></div>   
      </div> */}

      <div className="flex justify-between gap-12 mt-6">
        <div className="flex-grow max-w-3xl">
          {wishlist.map((product) => {
            return <CartItem {...product} key={product.id}></CartItem>;
          })}
        </div>

        <div className="w-80 flex-shrink-0">
          <div>
            <div className="flex justify-center p-4 bg-blue-200 rounded-t-md border-b-2 border-gray-300">
              <span className="text-lg font-semibold tracking-wide text-gray-700">
                PRICE DETAILS
              </span>
            </div>

            <div className="bg-white rounded-b-md shadow-md p-6 space-y-4">
              <div className="flex justify-between items-center pt-2">
                <span className="font-medium text-gray-600">
                  Total item quantity :
                </span>
                <span className="text-base font-semibold">{totalCartItem}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-medium text-gray-600">
                  SubTotal Bill :
                </span>
                <span className="text-lg font-bold">
                  ${subTotalBill.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-medium text-gray-600">GST (18%) :</span>
                <span className="text-lg text-red-500 font-bold">
                  ${GST.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-medium text-gray-600">Total Bill :</span>
                <span className="text-2xl text-green-500 font-bold">
                  ${totalBill.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
