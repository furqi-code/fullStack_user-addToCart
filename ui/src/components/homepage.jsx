import { Header } from "./header";
import { Outlet } from "react-router";
import { ProductContextProvider } from "../store/productContext";

export function HomePage() {
  return (
    <>
      <ProductContextProvider>
        <Header></Header>
        <Outlet></Outlet>
      </ProductContextProvider>
    </>
  );
}
