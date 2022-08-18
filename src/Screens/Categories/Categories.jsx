import React, { PureComponent } from "react";
import CartOverlay from "../../components/Cart/CartOverlay/CartOverlay";

import { connect } from "react-redux";

import { Product_lists } from "../../queries";

import { Query } from "@apollo/client/react/components";

import styles from "./Categories.module.css";
import CurrencyDropdown from "../../components/Currency/CurrencyDropdown/CurrencyDropdown";

import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

import { ReactComponent as Cart } from "../../assets/BlankCart.svg";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../Redux/CartEnhancer/cart.selector";
import {
  selectCurrencyHidden,
  selectCurrencySymbol,
} from "../../Redux/Currency/currency.selector";
import { selectCategory } from "../../Redux/Product/product.selector";
import { withRouter } from "../../withRouter";

class Categories extends PureComponent {
  render() {
    const { hidden, currencyHidden, category } = this.props;
    return (
      <div className={styles.overview}>
        {hidden ? null : <CartOverlay />}
        {currencyHidden ? null : <CurrencyDropdown />}
        <div className={styles.title}> {category.toUpperCase()} </div>
        <div className={styles["product-lists"]}>
          <Query query={Product_lists}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div> Error! {error.message} </div>;
              else {
                const categories = data.categories.map((category) => category);
                const { products } = categories.find(
                  (category) => category.name === this.props.category
                );
                return products.map((product) => {
                  const productPrice = product.prices.find(
                    (currency) =>
                      currency.currency.symbol === this.props.currencySymbol
                  );
                  return (
                    <ProductCard inStock={product.inStock} key={product.id}>
                      <div className={styles["card-overlay"]}>
                        <div className={styles["img-container"]}>
                          <Link to={`/product/${product.id}`}>
                            <img
                              className={styles["product-img"]}
                              src={product.gallery[0]}
                              alt={product.name}
                            />
                          </Link>
                          <div className={styles["out-of-stock"]}>
                            {" "}
                            {!product.inStock && "OUT OF STOCK"}{" "}
                          </div>
                        </div>
                        <Link to={`/product/${product.id}`}>
                          <div className={styles["card-footer"]}>
                            <p className={styles["product-name"]}>
                              {" "}
                              {product.name}{" "}
                            </p>
                            <p className={styles["product-price"]}>
                              {" "}
                              {productPrice.currency.symbol}
                              {productPrice.amount.toFixed(2)}{" "}
                            </p>
                          </div>
                        </Link>
                        {product.inStock && (
                          <div
                            onClick={
                              (this.handleAddToCart = () => {
                                this.props.navigate(`/product/${product.id}`);
                              })
                            }
                            className={styles["add-to-cart-btn"]}
                          >
                            <Cart />
                          </div>
                        )}
                      </div>
                    </ProductCard>
                  );
                });
              }
            }}
          </Query>
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
  currencyHidden: selectCurrencyHidden,
  category: selectCategory,
  currencySymbol: selectCurrencySymbol,
});

export default withRouter(connect(mapStateToProps)(Categories));