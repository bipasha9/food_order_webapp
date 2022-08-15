const FoodType =require('../models/FoodTypeModel')


const FoodTypeCtrl ={
    getFoodTypes: async(req,res) =>{
        try {
            const foodType =await FoodType.find()
            res.json(foodType)
        } catch (err) {
            return res.status(500).json({msg: err.message})
            
        }
    },
    // createCategory:async (req,res) =>{
    //     try {
    //         res.json('check admin succ')
    //     } catch (error) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    createFoodType: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {name} = req.body;
         
            const foodType = await FoodType.findOne({name})
            if(foodType) return res.status(400).json({msg: "This category already exists."})

            const newFoodType = new FoodType({name})

            await newFoodType.save()
            res.json({msg: "Created a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteFoodType: async(req, res) =>{
        try {
            // const products = await Products.findOne({category: req.params.id})
            // if(products) return res.status(400).json({
            //     msg: "Please delete all products with a relationship."
            // })

            await FoodType.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a FoodType"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateFoodType: async(req, res) =>{
        try {
            const {name} = req.body;
            await FoodType.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a FoodType"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
   

}
module.exports=FoodTypeCtrl