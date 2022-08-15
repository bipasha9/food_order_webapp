import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { useEffect } from 'react'

function CreateFoodtype() {
    const state = useContext(GlobalState)
    const [foodtypes] = state.foodtypesAPI.foodtypes
    const [foodtype, setFoodtype] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    

    const createFoodType = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/foodtype/${id}`, {name: foodtype}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/foodtype', {name: foodtype}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setFoodtype('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editFoodType = async (id, name) =>{
        setID(id)
        setFoodtype(name)
        setOnEdit(true)
    }

    const deleteFoodType = async id =>{
        try {
            const res = await axios.delete(`/api/foodtype/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
  return (
    <div className="categories">
            <form onSubmit={createFoodType}>
                <label htmlFor="foodtype">Food Type</label>
                <input type="text" name="foodtype" value={foodtype} required
                onChange={e => setFoodtype(e.target.value)} />

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    foodtypes.map(foodtype => (
                        <div className="row" key={foodtype._id}>
                            <p>{foodtype.name}</p>
                            <div>
                                <button onClick={() => editFoodType(foodtype._id, foodtype.name)}>Edit</button>
                                <button onClick={() => deleteFoodType(foodtype._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
  )
}
export default CreateFoodtype
