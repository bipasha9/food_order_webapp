import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { FlapperSpinner } from "react-spinners-kit";

function LoadMore({details}) {
    const state = useContext(GlobalState);
    const [landing_page, setLanding_Page] = state.productsAPI.LandingPage;
    const [category_page, setCategory_page] = state.productsAPI.CategoryPage;
    const [offer_page, setOffer_page] = state.productsAPI.OfferPage; 
    const [landing_result] =state.productsAPI.LandingResult ; 
    const [category_result]=  state.productsAPI.CategoryResult;
    const [offer_result] = state.productsAPI.OfferResult ;
    const [loading] = state.productsAPI.Loading ;
    let page ,setPage ,result; 
    const setPageMethods = {
        "Landing" : setLanding_Page , 
        "Category" : setCategory_page, 
        "Offer" : setOffer_page
    } 
   const pages = {
    "Landing" : landing_page , 
    "Category" : category_page, 
    "Offer" : offer_page
   }
   const results = {
    "Landing" : landing_result , 
    "Category" : category_result, 
    "Offer" : offer_result
   }
    setPage = setPageMethods[details] ;
    page = pages[details] ;
    result = results[details];
    const loadMore = () => {
        setPage(page + 1);
    };




    return (
        <div className="load_more">

            {
                result > 0 ?
                    (
                        <button onClick={() => loadMore()}
                            className="btn btn-primary btn-block">
                            {
                                loading ?
                                    <FlapperSpinner size={18} color={"white"} disable={loadMore}/>
                                    :
                                    "Load More"
                            }
                        </button>
                    )


                    :
                    null
            }

        </div>
    );
}

export default LoadMore;