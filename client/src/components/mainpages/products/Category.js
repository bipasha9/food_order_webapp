import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { useHistory } from 'react-router-dom';

function Category({ setcategoryTypeProduct = (f) => f }) {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [products] = state.productsAPI.CategoryProducts
    const [category, setCategory] = state.productsAPI.Category;
    const [loading,setLoading] = state.productsAPI.Loading
    const history = useHistory();

    const handleCategory = ( categoryName) => {
        const initialProducts = [...products];
        setLoading(true);
        history.push(
            {
                pathname: '/load-product-by-category',
                state: categoryName,
            }
        )
    }

    return (
        <div className="category1">
            <div className="container">

                <div className="category"  >



                    {
                        categories.map(category => (
                            <div className="btn-wraper" style={{
                                backgroundColor:'#f2f2f2'
                            }} key={category._id}>
                                <button id="button2" onClick={e => handleCategory(category._id)} key={category._id} >
                                    <img src={category.images.url} alt=""  style={{borderRadius:'50%'}}/>

                                </button>
                                <span style={{fontWeight:'bold',fontSize:'15px', display:'block', color:'#455760',fontFamily:'sans-serif'}} >{category.name}</span>

                            </div>

                        ))
                    }
                </div>

            </div>
        </div>

    )


}
export default Category