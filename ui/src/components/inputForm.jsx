import { useContext, useRef } from "react";
import { ProductContext } from "../store/productContext";

export function ItemInput() {
  const { addItem, showSelectedPage } = useContext(ProductContext);
  const nameRef = useRef();
  const mrpRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const imgRef = useRef();
  const discount = Math.round(Math.random() * 77);
  const stock = Math.round(Math.random() * 14);
  const quantity = 1;

  const insertItem = () => {
    const name = nameRef.current.value.trim();
    const MRP = mrpRef.current.value; 
    const description = descriptionRef.current.value.trim();
    const img = imgRef.current.value.trim();
    const category = categoryRef.current.value.trim();

    if (!name || !MRP || !description) {
      alert("Try to fill up all the input fields");
      return;
    }
    addItem({ name, MRP, description, img, category, discount, stock, quantity });
    nameRef.current.value = "";
    mrpRef.current.value = "";
    descriptionRef.current.value = "";
    imgRef.current.value = "";
    categoryRef.current.value = "General";
    // showSelectedPage(category);
  };

  return (
    <>
      <div className="flex justify-center items-center px-[75px]">
        <div style={{ height: "30px" }} className="mt-4 max-w-2xl">
          <form className="space-y-6">
            <div className="border-b border-gray-900/10 pb-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                <div className="flex items-center sm:col-span-4 gap-x-4 w-full">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-900 mb-2" 
                    >
                      name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Item name"
                      className="block w-full rounded-md border border-gray-300 py-2 px-3 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      ref={nameRef}
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="MRP"
                      className="block text-xs font-medium text-gray-700 mb-2"
                    >
                      MRP
                    </label>
                    <input
                      id="MRP"
                      type="number"
                      name="MRP"
                      placeholder="Item MRP"
                      className="block w-full rounded border border-gray-300 py-1 px-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-600"
                      ref={mrpRef}
                      min="0"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows="3"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600 resize-none"
                      ref={descriptionRef}
                    ></textarea>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Write a few sentences about the product.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="img"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image Link
              </label>
              <input
                id="img"
                type="url"
                name="img"
                placeholder="Image url"
                className="block w-full rounded border border-gray-300 py-1 px-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-600"
                ref={imgRef}
              />
            </div>

            <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-700">
              <div className="flex flex-col w-1/3 min-w-[120px]">
                <label htmlFor="status" className="mb-2">
                  Category
                </label>
                <select
                  id="category"
                  className="myBtn rounded-md border border-gray-300 py-2 px-3 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  ref={categoryRef}
                  defaultValue="General"
                >
                  <option value="General">General</option>
                  <option value="Sports">Sports</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-x-6">
              <button
                type="button"
                className="myBtn text-sm font-semibold text-gray-900 hover:text-gray-700"
                onClick={() => showSelectedPage("homePage")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="myBtn rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={insertItem}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
