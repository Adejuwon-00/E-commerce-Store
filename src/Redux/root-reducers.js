import { combineReducers } from "redux";
import { attributeReducer } from "./Attribute/attribute.reducer";
import { cartReducer } from "./CartEnhancer/cart.reducer";
import { currencyReducer } from "./Currency/currency.reducer";
import productReducer from "./Product/product.reducer";

export default combineReducers({
    cart: cartReducer,
    currency: currencyReducer,
    product: productReducer,
    attribute: attributeReducer,
});