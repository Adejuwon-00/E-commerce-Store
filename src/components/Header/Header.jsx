import React, { PureComponent } from "react";
import styles from "./Header.module.css";

import { connect } from "react-redux";
import { GET_LINKS } from "../../queries";

import { createStructuredSelector } from "reselect";

import { toggleCurrencyDropdown } from "../../Redux/Currency/currency.action";
import { changeCategory } from "../../Redux/Product/product.action";

import { Query } from "@apollo/client/react/components";

import CartIcon from "../Cart/CartIcon/CartIcon";

import { ReactComponent as Logo } from "../../assets/BrandLogo.svg";
import { ReactComponent as Angledown } from "../../assets/ArrowDown.svg";
import { ReactComponent as Angleup } from "../../assets/ArrowUp.svg";
import { Link, NavLink } from "react-router-dom";
import {
  selectCurrencyHidden,
  selectCurrencySymbol,
} from "../../Redux/Currency/currency.selector";

class Header extends PureComponent {
  render() {
    const { toggleCurrencyDropdown, hidden, currencySymbol, changeCategory } =
      this.props;
    return (
      <div className={styles["navbar"]}>
        <Query query={GET_LINKS}>
          {({ loading, error, data }) => {
            if (loading || error) return null;
            else {
              return (
                <div className={styles["link-container"]}>
                  {data.categories.map((category) => {
                    return (
                      <nav key={category.name}>
                        <ul>
                          <li className={styles["category-link"]}>
                            <NavLink
                              key={category.name}
                              to={`${category.name}`}
                              onClick={() => changeCategory(category.name)}
                              className={({ isActive }) =>
                                isActive ? styles.active : ""
                              }
                            >
                              {category.name.toUpperCase()}
                            </NavLink>
                          </li>
                        </ul>
                      </nav>
                    );
                  })}
                </div>
              );
            }
          }}
        </Query>
        <div className={styles["icon-container"]}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles["navbar-left"]}>
          <div className={styles.icon}>
            {currencySymbol}
            <span
              onClick={toggleCurrencyDropdown}
              className={styles["angle-icon"]}
            >
              {hidden ? <Angledown /> : <Angleup />}
            </span>
          </div>
          <div className={`${styles.icon} ${styles["cart-icon"]} `}>
            <CartIcon />
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  hidden: selectCurrencyHidden,
  currencySymbol: selectCurrencySymbol,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyDropdown: () => dispatch(toggleCurrencyDropdown()),
  changeCategory: (category) => dispatch(changeCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);