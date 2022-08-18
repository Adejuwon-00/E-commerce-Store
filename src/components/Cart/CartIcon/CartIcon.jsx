import React, { PureComponent } from "react";
import { ReactComponent as Cart } from "../../../assets/EmptyCart.svg";

import { connect } from "react-redux";

import { selectCartItemCount } from "../../../Redux/CartEnhancer/cart.selector";

import { toggleCart } from "../../../Redux/CartEnhancer/cart.action";

import styles from "./CartIcon.module.css";
import { createStructuredSelector } from "reselect";

class CartIcon extends PureComponent {
    render() {
        const { toggleCart, itemCount } = this.props;
        return (
            <div className={styles["cart-icon"]} onClick={toggleCart}>
                <Cart />
                <div className={styles.badge}>{itemCount}</div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemCount,
});

const mapDispatchToProps = (dispatch) => ({
    toggleCart: () => dispatch(toggleCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);