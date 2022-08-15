import { useState, useEffect } from "react";

import ProductItem from '../utlis/productItem/ProductItem';
import SearchFilter from './SearchFilter'
import Loading from '../utlis/loading/Loading'
import { useLocation } from "react-router-dom"; 
import { FireworkSpinner } from "react-spinners-kit";






const axios = require('axios').default;

const SearchResult = () => {
    // state
   
 
    const [product, setProduct] = useState([]);
    
    const location = useLocation() ;
    const [loading, setLoading] = useState(false);
    
    
    // when component mounts, get search params from url and use to send search query to backend
   

    useEffect(() => {
        setLoading(true)
      const toSearch = location.state ;
       if(toSearch&&toSearch!=='') {
        axios.post('/api/search-listings',  {search:toSearch}).then((res) => {

          // console.log("SEARCH RESULTS ===>", res.data);
          setProduct(res.data.result);
          // if(res.data.result.length === 0){
          //     alert("No results found");
          // }
          setLoading(false)
  
        });
       }
    
    }, [location.state]);

    const handleCheck = (id) =>{
      product.forEach(product => {
          if(product._id === id) product.checked = !product.checked
      })

      setProduct([...product])
 
  }
  
  // if(product.length === 0)
  //   return <h4 style={{textAlign: "center", fontSize: "2rem"}}>
  //   <SearchFilter/>
  //   No Search Result Found</h4> 
  if (loading) return <div className="spinner"><FireworkSpinner size={50} color="blue" loading={true} /></div>
    return (
      <>
       <SearchFilter/>
       
       <div className="container1">

           { 
              
              
              product.map(product => {
                    return <ProductItem key={product._id} product={product} isSearched={true}
                   handleCheck={handleCheck} />
                   })
            }
                   
             
        </div>
        {product.length === 0 && <h4 style={{textAlign: "center", fontSize: "2rem"}}>No Search Result Found</h4>}
      </>
    );
  }
              
  
  export default SearchResult;
