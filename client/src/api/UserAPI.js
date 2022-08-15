import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ObjectID } from "bson";
import produce from "immer";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [history, setHistory] = useState([]);
  const [order, setOrder] = useState([]);
  const [user_id, setUser_id] = useState("");
  const [subcriptionOptions, setSubcriptionOptions] = useState({});
  const [avatar,setAvatar] = useState('') ; 
  const [loading, setLoading] = useState(false);
  // const [phone,setPhone] = useState('') ;
  toast.configure();

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setUser_id(res.data._id);
          setAvatar(res.data.avatar) ;
          setCart(res.data.cart);
          setOrder(res.data.order);
          setAddress(res.data.address);
          setLoading(false);
          setSubcriptionOptions(res.data.subcriptionOptions);
        } catch (err) {
          // alert(err.response.data.msg)
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged)
      return toast.error("Please login to continue buying", {
        autoClose: 1500,
      });
    var _id = new ObjectID();
    //  console.log(product._id);
    const check = cart.find((item) => {
      return item.product && item.product._id === product._id;
    });
    if (!check) {
      setCart([
        ...cart,
        { product: { ...product }, quantity: 1, _id: _id.toString() },
      ]);
      toast.success("Product is added your Cart", { autoClose: 1500 });
      await axios.patch(
        "/user/addcart",
        { product: product._id, quantity: 1, _id: _id.toString() },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      toast.warning("This product already added to cart.", { autoClose: 1500 });
    }
  };

  const addAddress = async (address, token, id) => {
    return axios
      .post(`/user/address/${id}`, address, {
        headers: { Authorization: token },
      })
      .then((response) => {
        // console.log(response)
        if (response.status === 200) {
          setAddress((userAddress) => userAddress.push(address)); //also update my global address state
          return response.data;
        }
      })
      .catch((err) => {
        // console.log(err);
        return Promise.reject(err);
      });
  };

  const updateAddress = async(address, token, id) => {
    return axios
      .post(`/user/update-address/${id}`, address, {
        headers: { Authorization: token },
      })
      .then((response) => {
        // console.log(response)
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((err) => {
        // console.log(err);
        return Promise.reject(err);
      });
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    addAddress: addAddress,
    address: [address, setAddress], //contains all address
    history: [history, setHistory],
    order: [order],
    user_id: [user_id],
    loading: [loading, setLoading],
    subscription: [subcriptionOptions, setSubcriptionOptions],
    updateAddress: updateAddress,
    avatar : [avatar]
    // phone : phone
  };
}

export default UserAPI;
