import React, { PureComponent } from "react";

import { selectCurrencySymbol } from "../../../Redux/Currency/currency.selector";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import {
    selectCartItems,
    selectCartTotalPrice,
} from "../../../Redux/CartEnhancer/cart.selector";

import { ReactComponent as AngleRight } from "../../../assets/RightArrow.svg";
import { ReactComponent as AngleLeft } from "../../../assets/LeftArrow.svg";
import {
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
} from "../../../Redux/CartEnhancer/cart.action";
import styles from "./CartItem.module.css";

class CartItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 0,
        };
        this.decreaseCartItem = this.decreaseCartItem.bind(this);
    }

    handleNextImage = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                imageIndex: prevState.imageIndex + 1,
            };
        });
    };
    handlePrevImage = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                imageIndex: prevState.imageIndex - 1,
            };
        });
    };

    decreaseCartItem = (i, quantity) => {
        if (quantity === 1) {
            this.props.removeItem(i);
        } else {
            this.props.decreaseQuantity(i);
        }
    };

    render() {
        const { cartItem, currencySymbol, increaseQuantity, id } = this.props;
        const galleryCount = cartItem.gallery.length - 1;
        return (
            <div key={id} className={styles["cart-item"]}>
                <div className={styles["left-section"]}>
                    <h4 className={styles.brand}> {cartItem.brand} </h4>
                    <p className={styles.name}> {cartItem.name} </p>
                    <p className={styles.amount}>
                        {" "}
                        {currencySymbol}
                        {cartItem.amount.toFixed(2)}{" "}
                    </p>
                    <div className={styles["attribute-container"]}>
                        {Object.keys(cartItem.attributes).map((key) => {
                            return key === "Color" ? (
                                <div key={key} className={styles.attributes}>
                                    <p className={styles["attribute-key"]}>
                                        {" "}
                                        {key.toUpperCase()}:{" "}
                                    </p>
                                    <div
                                        style={{
                                            backgroundColor: cartItem.attributes[key],
                                            minWidth: "20px",
                                            border: "none",
                                        }}
                                        className={styles.attribute}
                                    ></div>
                                </div>
                            ) : (
                                <div key={key} className={styles.attributes}>
                                    <p className={styles["attribute-key"]}>
                                        {" "}
                                        {key.toUpperCase()}:{" "}
                                    </p>
                                    <div className={styles.attribute}>
                                        {" "}
                                        {key === "Color" ? null : cartItem.attributes[key]}{" "}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles["middle-section"]}>
                    <div onClick={() => increaseQuantity(id)} className={styles.increase}>
                        {" "}
                        +{" "}
                    </div>
                    <div> {cartItem.quantity} </div>
                    <div
                        onClick={() => this.decreaseCartItem(id, cartItem.quantity)}
                        className={styles.decrease}
                    >
                        {" "}
                        -{" "}
                    </div>
                </div>
                <div className={styles["right-section"]}>
                    <div className={styles["angle-left-container"]}>
                        {!(this.state.imageIndex === 0) && (
                            <div
                                onClick={this.handlePrevImage}
                                className={styles["angle-left"]}
                            >
                                <AngleLeft />{" "}
                            </div>
                        )}
                    </div>
                    <div className={styles["image-container"]}>
                        <img
                            className={styles["cart-image"]}
                            src={cartItem.gallery[this.state.imageIndex]}
                            alt={cartItem.name}
                        />
                    </div>
                    <div className={styles["angle-right-container"]}>
                        {!(this.state.imageIndex === galleryCount) && (
                            <div
                                onClick={this.handleNextImage}
                                className={styles["angle-right"]}
                            >
                                {" "}
                                <AngleRight />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    currencySymbol: selectCurrencySymbol,
    totalAmount: selectCartTotalPrice,
});
const mapDispatchToProps = (dispatch) => ({
    increaseQuantity: (item) => dispatch(increaseQuantity(item)),
    removeItem: (item) => dispatch(removeItemFromCart(item)),
    decreaseQuantity: (item) => dispatch(decreaseQuantity(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);