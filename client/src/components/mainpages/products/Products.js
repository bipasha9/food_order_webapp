import { useContext, useState,useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utlis/productItem/ProductItem'
import LoadingNew from '../utlis/loading/LoadingNew';
import Slideshow from './slideshow';
import axios from 'axios'
import Filters from './Filters';
import LoadMore from './LoadMore'
import Category from './Category';
import { Link } from "react-router-dom";
 


function Products() {
    const state = useContext(GlobalState)   
    const [products,setProducts] = state.productsAPI.LandingProducts ;  
  //  const [category, setCategory] = state.productsAPI.category
  //  const [page, setPage] = state.productsAPI.page
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
   // const [sort, setSort] = state.productsAPI.sort;
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [categoryTypeProducts, setcategoryTypeProduct] = useState([]) 

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', { public_id }, {
                headers: { Authorization: token }
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if (loading) return <div><LoadingNew /></div>
    return (


        <>
            
            <Filters details ="Landing" />

            <Slideshow />
            

           
            <Category setcategoryTypeProduct={
                setcategoryTypeProduct // category type is selected
            } />

           
              
            



            {
                isAdmin &&
                <div className="delete-all">
                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll}>Delete ALL</button>
                </div>
            }

            <div className="products">
            {
                categoryTypeProducts.length >0 ?(
                    categoryTypeProducts.map(product => {
                        return <ProductItem key={product._id} product={product}
                        isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                    })  
                ):(
                    products.map(product => {
                        return <ProductItem key={product._id} product={product}
                        isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                    })
                ) 
            } 
              
            </div>

            <LoadMore 
                details ="Landing"
            />
            {products.length === 0 && <LoadingNew />}
        </>
    )
}

export default Products