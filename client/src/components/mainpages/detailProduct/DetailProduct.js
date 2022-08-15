import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import SearchFilter from '../products/SearchFilter';
import ProductItem from '../utlis/productItem/ProductItem';
import { FireworkSpinner } from "react-spinners-kit";
import { Helmet } from "react-helmet";

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.CategorywiseProducts;
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
    const [category, setCategory] = state.productsAPI.Category;
    const [related, setRelated] = state.productsAPI.Related;
    const [loading] = state.productsAPI.Loading;






    useEffect(() => {
        setCategory(params.cat_id);
        setRelated(true);
        if (params.id) {
            products.forEach((product) => {
                if (product._id === params.id) setDetailProduct(product);
            });

        }

        return () => {
            setCategory("")
            setRelated(false);
        }
    }, [params.id, params.category, loading,products]);
    // if(detailProduct.length === 0) return null
    if (detailProduct.length === 0) return <div className="spinner"><FireworkSpinner size={60} color={"blue"} loading={loading} /></div>





    return (
        <>
            <Helmet>
                <title>{detailProduct.title}</title>
               


            </Helmet>

            <SearchFilter />

            <div className="detail" >

                {detailProduct.images && <img src={detailProduct.images.url} alt="" />}
                <div className="box-detail">
                    <div className="row">
                        <h2><b>{detailProduct.title}</b></h2>
                        {/* <h6>id: {detailProduct.product_id}</h6> */}
                    </div>
                    <div >

                        {
                            detailProduct.pricemk ? <del>MRP-{detailProduct.pricemk}</del> : null
                        }

                        {/* : <p className="space-hide"></p> */}



                    </div>

                    <span>RS-{detailProduct.price}</span>
                   





                    {/* <p>{detailProduct.Rooms!==undefined?detailProduct.Rooms:'No Rooms'}</p> */}
                    {/* {detailProduct.Rooms!==undefined?(detailProduct.Rooms.map((room,index)=>(
                        <p key={index}> { room }</p>
                    ))):(<p>No rooms</p>)} */}



                    <br/>
                   

                    
                   <p className='line123'><b style={{color:'#303030',fontSize:'20px'}}>Description</b>-{detailProduct.description}</p>
                   <Link to="/cart"  style={{
                        backgroundColor:'#595959',
                        color:'white',
                        borderRadius:'5px',
                        padding:' 5px 15px',
                        fontSize:'20px',
                        marginTop:'15px'

                    }}
                        onClick={() => addCart(detailProduct)}>
                        Add Cart
                    </Link>
                    


                </div>
                
                
            </div>
            <div>
                <h2 style={{color:'#383838'}}>
                    Related  product
                </h2>
                <div className="products" style={{height:'320px',width:'100%',overflowY:'auto'}}>
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>



        </>

    )
}
export default DetailProduct