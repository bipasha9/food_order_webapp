import { useRef } from 'react'
import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
export default function AddressDetailsProfile({ address, setSelected, selected, setSelectedAddress }) {
  const selectedRef = useRef(null);
  const state = useContext(GlobalState);
  // const history = useHistory();
  const [token] = state.token
  const history = useHistory() ;


  // const editAddress = async (id, data) => {
  //   try {
  //     const updateAddress = await axios.put(`/user/address/${id}`, data, {
  //       headers: { Authorization: token }
  //     })

  //     if (updateAddress.status === 200) {
  //       toast.success('Address Updated', { autoClose: 1500 })
  //     }
  //     window.location.reload();


  //   } catch (err) {
  //     toast.error(err.response.data.msg, { autoClose: 1500 })
  //   }
  // }


  // const handleChange = (e) => {
  //         const inititalSelectedRef = {...selected} ;  
  //         sessionStorage.setItem('address', JSON.stringify(address)) ;
  //         if( Object.keys(inititalSelectedRef).length === 0){ 
  //             // it means not selected
  //          setSelected(selectedRef)

  //         }
  //         else {
  //             //update previous selected value to false 
  //             //and inset new refCheck box to selected state

  //             if(!inititalSelectedRef.current.checked){
  //                 inititalSelectedRef.current.checked = true ; 

  //             }
  //             else inititalSelectedRef.current.checked = false ; 
  //             setSelected(selectedRef);

  //         }
  //         setSelectedAddress(address) ;

  // }
  const deleteAddress = async (id,) => {
    try {


      const deleteAddress = await axios.delete(`/user/address/${id}`, {
        headers: { Authorization: token }
      })


      if (deleteAddress.status === 200) {
        toast.error('Address Deleted', { autoClose: 1500 })
      }
      window.location.reload();


    } catch (err) {
      toast(err.response.data.msg, { autoClose: 1500 })
    }
  }

  return (
    <>
      <div className="addressbar" >

        <div className="address_contain_wraper1" style={{ display: 'flex', flexDirection: 'column' }}>
          <p
            style={{
              backgroundColor: "#F0F0F0",
              padding: "4px ",
              width: "70px",
              marginBottom: '10px'
            }}
          >
            Address
          </p>
          <div className="address_inner_contain_wraper1">
            <p style={{ fontWeight: "400" }}><span style={{fontWeight:'bold',fontSize:'18px'}}>{address.name} </span>
              <br />
              Address-
              {address.address}
              <br />
              State-{address.state}&nbsp;&nbsp; City-{address.city}<br />
              <span style={{ fontWeight: "400" }}>Pin-{address.pincode}</span>
              <br/>Phone-{address.number}
            </p>
            {/* checkbox  */}
            <label style={{}}>


            </label>
            <div className='edit_delete'>
              
              <button className="delete" onClick={() => deleteAddress(address._id)}>Delete</button>
  
              <button className='edit' onClick={()=>{
                history.push({
                  pathname: '/edit_adress',
                  state:address
                })
              }} >Edit</button>
              
            </div>


          </div>
        </div>
      </div>
    </>
  );
}
