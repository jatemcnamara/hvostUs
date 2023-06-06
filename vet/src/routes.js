import ShopDogs from "./pages/ShopDogs"
import ShopCats from "./pages/ShopCats"
import ShopBirds from "./pages/ShopBirds"
import ShopRodents from "./pages/ShopRodents"
import ShopFishes from "./pages/ShopFishes"
import ShopReptiles from "./pages/ShopReptiles"
import Checkout from "./pages/Checkout"
import ProductPageLayout from "./pages/ProductPageLayout"
import ShopMainPage from "./pages/ShopMainPage"
import Admin from "./pages/Admin"
import AfterCheckout from "./pages/AfterCheckout"

import { BIRDS_ROUTE, CHECKOUT_ROUTE, CATS_ROUTE, DOGS_ROUTE, FISHES_ROUTE, HOME_ROUTE, PRODUCT_ROUTE, REPTILES_ROUTE, RODENTS_ROUTE, ADMIN_ROUTE, AFTER_CHECKOUT_ROUTE } from "./utils/consts";

export const routes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: HOME_ROUTE,
        Component: ShopMainPage
    },
    {
        path: DOGS_ROUTE,
        Component: ShopDogs
    },
    {
        path: CATS_ROUTE,
        Component: ShopCats
    },
    {
        path: BIRDS_ROUTE,
        Component: ShopBirds
    },
    {
        path: RODENTS_ROUTE,
        Component: ShopRodents
    },
    {
        path: FISHES_ROUTE,
        Component: ShopFishes
    },
    {
        path: REPTILES_ROUTE,
        Component: ShopReptiles
    },
    {
        path: CHECKOUT_ROUTE,
        Component: Checkout
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPageLayout
    },
    {
        path: AFTER_CHECKOUT_ROUTE,
        Component: AfterCheckout
    }
    
]