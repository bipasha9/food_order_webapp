import React, { useContext } from "react";
import { Switch, Route ,Redirect} from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";

import Login from "./auth/Login";
import Register from "./auth/Register";

// import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Cart from "./cart/Cart";
import NotFound from "./utlis/not_found/NotFound";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";

import { GlobalState } from "../../GlobalState";
import Banner from "./banner/Banner";


import Address from "./cart/Address";
import AddAddress from "./cart/AddAddress";
import CheckOut from "./cart/Checkout";
import Status from "./status/Status";
import LoadProductsByCategory from "./products/LoadProductsByCategory";
import SearchResult from "./products/SearchResult";
import Contact from "./aboutUs/Contact";

import PrivatePolicy from "./aboutUs/PrivatePolicy";
import RefundPoilicy from "./aboutUs/RefundPoilicy";
import Offer from "./products/offer";
import LoadingNew from "./utlis/loading/LoadingNew";
import Profile from "./MyProfile/Profile";
import AddressProfile  from "./MyProfile/AddressProfile";
import AddAddressProfile from "./MyProfile/Addadressprofile";
import EditAdress from "./MyProfile/EditAdress";
import Review from "./review/Review" ;
import EditAddressCart from './cart/EditAdressCart'
import CreateFoodtype from "./createFoodType/CreateFoodtype";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [loading] = state.userAPI.loading;

  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/search-result"  component={SearchResult} />

      <Route path="/profile" component={isLogged ? Profile : NotFound} exact />

      <Route path="/detail/:id/:cat_id" exact component={DetailProduct} />

      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />
      

     
     
  

      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : NotFound}
      />
      <Route
        path="/foodtype"
        exact
        component={isAdmin ? CreateFoodtype : NotFound}
      />
      
      <Route
        path="/create_product"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route
        path="/edit_product/:id"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />

      

    
      <Route
        path="/order_history"
        exact
        component={loading ? LoadingNew : (isLogged ?  OrderDetails: NotFound)}
      />

      <Route path="/cart" exact component={Cart} />
     
      <Route path="/address" exact component={isLogged ? Address : NotFound} />
      <Route path="/addressprofile" exact component={isLogged ? AddressProfile : NotFound} />
      <Route path="/addaddressprofile" exact component={isLogged ? AddAddressProfile : NotFound} />

      <Route path="/edit_adress" exact component={isLogged ? EditAdress : NotFound} />

      <Route path="/edit_adresscart" exact component={isLogged ? EditAddressCart : NotFound} />

      <Route
        path="/addaddress"
        exact
        component={isLogged ? AddAddress : NotFound}
      />
      <Route
        path="/banner"
        exact
        component={isLogged ? Banner : NotFound}
      />
      <Route 
        path ='/reviews'
        exact 
        component={Review}
      />
      
     
      <Route path="/offer" exact component={Offer} />
   
      <Route
        path="/checkout"
        exact
        component={loading ? LoadingNew : (isLogged ? CheckOut : NotFound)}
      />
      <Route path="/status" exact component={isAdmin ? Status : NotFound} />
      <Route
        path="/load-product-by-category"
        exact
        component={LoadProductsByCategory}
      />
      <Route path="/contact" exact component={Contact} />
      
      <Route path="/privatepolicy" exact component={PrivatePolicy} />
      <Route path="/refundpolicy" exact component={RefundPoilicy} />

      <Redirect to='/'  />
      
    </Switch>
  );
}

export default Pages;
