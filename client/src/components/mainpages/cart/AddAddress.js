import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import UserAPI from "../../../api/UserAPI";
import { useHistory } from "react-router-dom";
import Empty from '../images/emaptycart.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useForm } from "react-hook-form";
import "../InputStyle/inputStyle.css";

function AddAddress() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart
  const [token] = state.token;
  const userApi = UserAPI(token);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addAddress = userApi.addAddress;

  const submit = (data, event) => {
    //add address to backend and update global address state
    event.preventDefault();
    // console.log(data);
    addAddress(data, token, userApi.user_id)
      .then((data) => {
        toast.success("Saved Successfully", {autoClose: 1500});
        // console.log(data);
        history.push({
          pathname: "/checkout",
          state: { data },
        });
      })
      .catch((err) => {
        toast.error("Unable to save your address check details properly", {autoClose: 1500});
      });
  };

  const renderError = (error) => {
    //edit "error" css class name in cart.css
    //to make changes in edit message
    switch (error.type) {
      case "pattern":
        return <span className="error">Mobile number invalid</span>;
      case "required":
        return <span className="error">Field is required</span>;
      case "minLength":
        return (
          <span className="error">Length doesnot meet the expectation</span>
        );
    }
  };

  const addressForm = () => {
    return (
      <form className="Address form" onSubmit={handleSubmit(submit)} >
        <h4 className="Addres1">ADD YOUR ADDRESS</h4>

        <div className="adress ">
          <div className="floating">
            <input
              type="text"
              className="floating__input"
              name="name"
              placeholder="Enter Your Name"
              {...register("name", { required: true })}
            />
            <label
              htmlFor="input__username"
              className="floating__label"
              data-content="Name"
            >
              <span className="hidden--visually">Username</span>
            </label>
            {errors.name && renderError(errors.name)}
          </div>
          <div className="floating">
            <input
              type="tel"
              className="floating__input"
              name="number"
              placeholder="Enter Your Number"
              {...register("number", {
                required: true,
                //regex to check if the phone number is valid 10 digit
                pattern:
                  /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
              })}
            />
            <label
              htmlFor="input__username"
              className="floating__label"
              data-content="Enter Your Number"
            >
              <span className="hidden--visually">Username</span>
            </label>
            {errors.number && renderError(errors.number)}
          </div>
        </div>

        <div className="adress">
          <div className="floating">
            <input
              type="number"
              name="pincode"
              className="floating__input"
              placeholder="Pincode"
              {...register("pincode", { required: true, minLength: 6 })}
            />
            {errors.pincode && renderError(errors.pincode)}
            <label
              htmlFor="input__username"
              className="floating__label"
              data-content="Pincode"
            >
              <span className="hidden--visually">Username</span>
            </label>
          </div>
          <div className="floating">
            <input
              type="text"
              name="locality"
              className="floating__input"
              placeholder="Locality "
              {...register("locality", { required: true })}
            />
            <label
              htmlFor="input__username"
              className="floating__label"
              data-content="Locality"
            >
              <span className="hidden--visually">Username</span>
            </label>
            {errors.locality && renderError(errors.locality)}
          </div>
        </div>

        <div className="big_add">
          <div className="big_floating">
            <textarea
              className="floating__input"
              {...register("address", { required: true })}
              placeholder="Address"
            ></textarea>
            <label
              htmlFor="input__username"
              className="big_floating__label"
              data-content="Address"
            >
              <span className="hidden--visually">Username</span>
            </label>
            {errors.address && renderError(errors.address)}
          </div>
        </div>
        <div className="adress">
          <div className="floating">
            <input
              name="city"
              type="text"
              className="floating__input"
              placeholder="City"
              {...register("city", { required: true })}
            />
            {errors.city && renderError(errors.city)}
            <label
              htmlFor="input__username"
              className="floating__label"
              data-content="City"
            >
              <span className="hidden--visually">Username</span>
            </label>
          </div>
          <div className="floating">
            <input
              type="text"
              placeholder="State"
              className="floating__input"
              name="state"
              {...register("state", { required: true })}
            />
            <label
              htmlFor="input__username"
              className="floating__label"
              data-content="State"
            >
              <span className="hidden--visually">Username</span>
            </label>
            {errors.state && renderError(errors.state)}
          </div>
        </div>

        <p className="alt">Alternate Details</p>

        <div className="adress">
          <div className="floating">
            <input
              className="four"
              type="text"
              name="landmark"
              className="floating__input"
              placeholder="Landmark(Optional)"
              {...register("landmark")}
            />
            <label
              htmlFor="input__username"
              className="floating__label"
              data-content="Landmark(Optional)"
            >
              <span className="hidden--visually">Username</span>
            </label>
          </div>
          <div className="floating">
            <input
              type="tel"
              className="floating__input"
              name="alternate"
              placeholder="Alternate Number"
              {...register("alternate", {
                //regex to check if the phone number is valid 10 digit
                pattern:
                  /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
              })}
            />
            <label
              htmlFor="input__username"
              className="floating__label"
              data-content="Alternate Number"
            >
              <span className="hidden--visually">Username</span>
            </label>  
            {errors.alternate && renderError(errors.alternate)}
          </div>
        </div>

        <button className="add_btn">Save and Deliver Here</button>
      </form>
    );
  };

  
  if (cart.length === 0)
        return <div className="empty">
            <img src={Empty} alt="empty" />
            <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '2rem', }}> </div>
        </div>
  return addressForm();
}
export default AddAddress;
