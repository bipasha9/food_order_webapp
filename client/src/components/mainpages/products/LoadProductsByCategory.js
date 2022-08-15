import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utlis/productItem/ProductItem";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import { FireworkSpinner } from "react-spinners-kit";

export default function LoadProductsByCategory({ history }) {
  const loadByCategory = history.location.state;
  const state = useContext(GlobalState);
  const [category, setCategory] = state.productsAPI.Category;
  const [products, setProducts] = state.productsAPI.CategoryProducts; 
  const [sort, setSort] = state.productsAPI.CategorySort;
  const [page, setPage] = state.productsAPI.CategoryPage;
  const [loading] = state.productsAPI.Loading;
  const [callback, setCallback] = state.productsAPI.callback;
  const [category_flag,setCategoryFlag] = state.productsAPI.CategoryFlag ;
  useEffect(() => {
    setCategory(loadByCategory);
    setCategoryFlag(true) ;
   
    return () => {
      setPage(1) ; 
      setSort('') ; 
      setCategoryFlag(false);
      setProducts([]) ;
    }
    
  }, [category]);

  
  
  // const loadMore = () => {
  //   setPage(page + 1);
  //   setTimeout(() => {
  //     setLoading(false);


  

  return (
    <>
      <Filters details='Category' />
      <div className="products">
      
        {products?.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
        </div>

      {products.length===0 ? (
        <div className="loading">
          <FireworkSpinner size={50} color="blue"/>
        </div>
      ) :(
         
        <LoadMore details='Category'/>
      
      )}
      
     
    </>
  );
}
