import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../../../api/UserAPI";
import { GlobalState } from "../../../GlobalState";
import AddressDetailsProfile from "./AddressDetailsProfile";
import Empty from '../images/emaptycart.png';
import { FlapperSpinner } from "react-spinners-kit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../utlis/loading/Loading";
function AddressProfile({  }) {
  const contextState = useContext(GlobalState);

  const [token] = contextState.token;
  const userState = UserAPI(token);
  // console.log(userState);
  const [address] = userState.address;
  const [cart] = userState.cart
  const [selected, setSelected] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const [loading, setLoading] = useState(false);
//   const redirectConfirm = () => {
//     if (Object.keys(selectedAddress).length === 0) {
//       toast.error('Please Select Address', { autoClose: 1500 })
//       return;
//     }
//     history.push({
//       pathname: '/checkout',
//       state: { ...selectedAddress }
//     })

//   };
 
  // if (cart.length === 0)
  // return <div className="empty">
  //     <img src={Empty} alt="empty" />
  //     <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '2rem', }}> </div>
  // </div>
  // if (loading) return <div><Loading /></div>
  return (
    <div className="address_container1">
      <p style={{ margin: "20px", fontWeight: "500", fontSize: "19px" ,textAlign:'center'}}>
       My Addresses
      </p>
      <div className="address_inner_container1">
        {/* addresses  */}
        <Link id="view" to="/addaddressprofile">
            <button  className="add_new1"> + Add A New Address </button>
          </Link>
        <div>
          {address.length > 0 ? (
            address.map((addressDetailProfile) => (
              <AddressDetailsProfile
                address={addressDetailProfile}
                key={addressDetailProfile._id}
                setSelected={setSelected}
                selected={selected}
                setSelectedAddress={setSelectedAddress}

              />
            ))
          ) : (
            <Loading loading={true}/>
          )

          
          }
        </div>
        {/* <div className='btn_div' >
          <div className="next_btn_div">
            <button className="next_btn" onClick={redirectConfirm}>
              Next
            </button>
          </div>
          



        </div> */}

      </div>
     
      
    </div>
  );
}

export default AddressProfile;
