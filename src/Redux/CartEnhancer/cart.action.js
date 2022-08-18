import { cartActionTypes } from "./cart.type";

export const addItem = (item) => ({
    type: cartActionTypes.ADD_CART_ITEM,
    payload: item,
});

export const decreaseQuantity = (item) => ({
    type: cartActionTypes.DECREASE_QUANTITY,
    payload: item,
});

export const increaseQuantity = (item) => ({
    type: cartActionTypes.INCREASE_QUANTITY,
    payload: item,
});

export const toggleCart = () => ({
    type: cartActionTypes.TOGGLE_CART,
});

export const removeItemFromCart = (item) => ({
    type: cartActionTypes.REMOVE_CART_ITEM,
    payload: item,
});