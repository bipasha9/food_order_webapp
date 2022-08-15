import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

function BtnRender({ product }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart, setCart] = state.userAPI.cart;
  const [showFullBtn, setShowFullBtn] = useState(false);
  const [prodInCart, setProdInCart] = useState({});
  const [token] = state.token;
  const addCart = state.userAPI.addCart;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  //debounced callbacks
  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
      window.location.reload();
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const updateCartApi = useDebouncedCallback(
    // for increment
    //function

    async (cart) => {
      const updatedCart = [];
      cart.forEach((cartItem) => {
        const newUpdatedCartItem = {
          product: cartItem.product._id,
          quantity: cartItem.quantity,
          _id:cartItem._id
        };
        updatedCart.push(newUpdatedCartItem);
      });
      await axios.post(
        "/user/cart",
        { cart: updatedCart },
        {
          headers: { Authorization: token },
        }
      );
      // toast.success('Added to cart')
    },
    500
  );

  const ifExistProductInCart = () => { 
    const prodFound = cart?.find( 
      (cartItem) => cartItem.product && cartItem.product._id === product._id
    );
    if (prodFound === undefined) return false;
    setProdInCart(prodFound);
    return true;
  };

  useEffect(() => {
    if (!isAdmin) {
      if (ifExistProductInCart()) {
        setShowFullBtn(true);
      }
      return () => {
        setShowFullBtn(false);
      };
    }
  }, [cart]);

  const addToCart = async (cart) => {
    const updatedCart = [];
    cart.forEach((cartItem) => {
      const newUpdatedCartItem = {
        product: cartItem.product._id,
        quantity: cartItem.quantity,
        _id:cartItem._id
      };
      updatedCart.push(newUpdatedCartItem);
    });
    await axios.post(
      "/user/cart",
      { cart: updatedCart },
      {
        headers: { Authorization: token },
      }
    );
    // toast.success('Added to cart')
  };

  const increment = (id) => {
    let newCart = [...cart];
    // newCart.forEach(cartItem => {
    //
    // })
    newCart = newCart.map((cartItem) => {
      const copyItem = { ...cartItem };
      if (cartItem.product._id === id) {
        copyItem.quantity += 1;
      }
      return copyItem;
    });
    setCart(newCart);
    updateCartApi(newCart);
  };
  const decrement = (id) => {
    let newCart = [...cart];
    let removed = false;
    // newCart.forEach(cartItem => {
    //
    // })
    newCart = newCart.map((cartItem) => {
      const copyItem = { ...cartItem };

      if (cartItem.product._id === id) {
        if (cartItem.quantity === 1) {
          removeProduct(id);
          removed = true;
          return copyItem;
        } else {
          copyItem.quantity -= 1;
        }
      }
      return copyItem;
    });
    !removed && setCart(newCart);
    !removed && updateCartApi(newCart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this ?")) {
      let copyCart = [...cart],
        index = 0;
      copyCart.forEach((item, ind) => {
        if (item.product._id === id) index = ind;
      });
      copyCart.splice(index, 1);
      addToCart(copyCart);
      setCart(copyCart);
    }
  };

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <button
            id="btn_buy"
            onClick={() => deleteProduct(product._id, product.images.public_id)}
          >
            Delete
          </button>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            <button style={{color:'white'}}>Edit</button>
          </Link>
        </>
      ) : (
        <>
          {/* <Link id="btn_buy" to="#!" onClick={() => addCart(product)} >
                        Add 
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        View 
                    </Link> */}

          {showFullBtn ? (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "2px",
                  alignItems: "center",
                }}
              >
                <button
                  className="small_btn"
                  onClick={() => {
                    decrement(product._id);
                  }}
                >
                  -
                </button>
                <p> {prodInCart.quantity ? prodInCart.quantity : 1}</p>
                <button
                  className="small_btn"
                  onClick={() => {
                    increment(product._id);
                  }}
                >
                  +
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  marginLeft: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button className="first_btn" onClick={() => addCart(product)}>
                  ADD
                </button>
                <button className="second_btn" onClick={() => addCart(product)}>
                  +
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default BtnRender;