import {useState, useEffect} from 'react'
import axios from 'axios'

function FoodTypeAPI() {
    const [foodtypes, setFoodtypes] = useState([])
    
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getFoodtypes = async () =>{
            const res = await axios.get('/api/foodtype')
            setFoodtypes(res.data)
        }

        getFoodtypes()
    },[callback])
    return {
        foodtypes: [foodtypes, setFoodtypes],
        callback: [callback, setCallback]
    }
}

export default FoodTypeAPI