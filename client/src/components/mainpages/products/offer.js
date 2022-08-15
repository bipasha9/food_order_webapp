import React, { useState,useContext,  useEffect } from 'react';
import ProductItem from '../utlis/productItem/ProductItem'
import { GlobalState } from '../../../GlobalState';
import LoadMore from './LoadMore';
import SearchFilter from './SearchFilter';
import { FireworkSpinner } from "react-spinners-kit";


function Offer() {
     const state = useContext(GlobalState)
    const [products] = state.productsAPI.OfferProducts ; 
    const [offerwise,setOfferwise] = state.productsAPI.Offerwise ; 
    const [loading,setLoading] = state.productsAPI.Loading ;
    let check_offer = 1 ;

    useEffect(() => {
       
       setOfferwise(check_offer.toString()) ;

    }, [])


    return (

        <div>
            <SearchFilter />
        <div className="products" >
        
           {
                products.length===0 ? <div className="spinner"><FireworkSpinner size={50} color="#00BFFF" /></div> :
                <>
                {
                    products.map((product) => {
                        return <ProductItem key={product._id} product={product} />
                    }
                    )
                    
                }
                

            </>
           }
           
           

            

        </div>
        <LoadMore details = 'Offer'/>
        </div>
    )
}
export default Offer;