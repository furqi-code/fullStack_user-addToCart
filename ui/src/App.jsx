import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HomePage } from "./components/homepage";
import { SportsProducts } from "./components/sportsPage";
import { GeneralProducts } from "./components/generalPage";
import { ElectronicsProds } from "./components/electronicsPage";
import { ItemInput } from "./components/inputForm";
import { NotFound } from "./components/NotFound";
import { ShowBag } from "./components/showBag";
import { HomeDesign } from "./components/homeDesign";

const routes = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: HomeDesign
      },
      {
        path: '/Sports',
        Component: SportsProducts
      },
      {
        path: '/Electronics',
        Component: ElectronicsProds
      },
      {
        path: '/General',
        Component: GeneralProducts
      },
      {
        path: '/addItem',
        Component: ItemInput
      },
      {
        path: '/cartItems',
        Component: ShowBag
      },
    ]
  }
])

export function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}
