import React, { PureComponent } from "react";
import styles from "./CartScreen.module.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAllCartItemCount,
  selectCartItems,
  selectCartTotalPrice,
} from "../../Redux/CartEnhancer/cart.selector";
import { selectCurrencySymbol } from "../../Redux/Currency/currency.selector";
import CartItem from "../../components/Cart/CartItem/CartItem";


class CartScreen extends PureComponent {
  render() {
    const { cartItems, currencySymbol, totalAmount, itemCount } = this.props;

    return (
      <div className={styles["cart-page"]}>
        <div className={styles.title}>CART</div>
        {cartItems.length >= 1 ? (
          <div className={styles["cart-items"]}>
            {cartItems.map((cartItem, i) => {
              return <CartItem id={i} key={i} cartItem={cartItem} />;
            })}
          </div>
        ) : (
          <div className={styles["empty-message"]}>
            Your Cart is Currently Empty !
          </div>
        )}

        {cartItems.length ? (
          <div className={styles["bottom-section"]}>
            <div className={styles.top}>
              <div className={styles["tax-section"]}>
                <h4 className={styles.total}>Tax</h4>
                <p className={styles["total-amount"]}>
                  {" "}
                  {`${currencySymbol} 50.00`}{" "}
                </p>
              </div>
              <div className={styles["quantity-section"]}>
                <h4 className={styles.total}>Qty</h4>
                <p className={styles["total-amount"]}>{itemCount}</p>
              </div>
            </div>
            <div className={styles["total-section"]}>
              <h4 className={styles.total}>Total</h4>
              <p className={styles["total-amount"]}>
                {" "}
                {currencySymbol}
                {totalAmount.toFixed(2)}{" "}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {cartItems.length ? (
          <div className={styles.cta}>
            <button disabled={true} className={styles["checkout-btn"]}>
              ORDER
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  currencySymbol: selectCurrencySymbol,
  totalAmount: selectCartTotalPrice,
  itemCount: selectAllCartItemCount,
});

export default connect(mapStateToProps)(CartScreen);