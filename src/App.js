import React, { Component } from "react";
import { Container, Navbar, NavLink } from "react-bootstrap";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import BookListPage from "./BookListPage";
import ProductList from "./ProductList";
import OrderSummary from "./OrderSummary";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <header>
            <Navbar to="/">
              <Container>
                <NavLink>
                  <Navbar.Brand>Master Electricals</Navbar.Brand>
                </NavLink>

                <div className="Nav__right">
                  <ul className="Nav__item-wrapper nav navbar-nav">
                    <li className="Nav__item">
                      <Link className="Nav__link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="Nav__item">
                      <Link className="Nav__link" to="/products">
                        Products
                      </Link>
                    </li>
                    <li className="Nav__item">
                      <Link className="Nav__link" to="/orderSummary">
                        Orders
                      </Link>
                    </li>
                  </ul>
                </div>
              </Container>
            </Navbar>
          </header>
          <Switch>
            <Route exact path="/">
              <BookListPage />
            </Route>
            <Route path="/products" component={ProductList} />
            <Route path="/orderSummary" component={OrderSummary} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
