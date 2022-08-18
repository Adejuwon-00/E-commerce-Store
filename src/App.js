import React, { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components"
import Header from "./components/Header/Header";
import Categories from "./Screens/Categories/Categories";
import Description from "./Screens/Description/Description";
import CartScreen from "./Screens/CartScreen/CartScreen";

const AppWrapper = styled.div`
  padding-left: 3.75rem;
  padding-right: 3.75rem;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Fragment>
          <Header />
          <Routes>
            <Route path="/" element={<Categories />} />
            <Route path=":categoryId" element={<Categories />} />
            <Route path="product/:productId" element={<Description />} />
            <Route path="cart" element={<CartScreen />} />
          </Routes>
        </Fragment>

      </AppWrapper>
    );
  }
}

export default App;
