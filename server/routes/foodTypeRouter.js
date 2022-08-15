const router = require('express').Router()
const FoodTypeCtrl =require('../controllers/foodtypeCtrl')
const auth =require('../middleware/auth')
const authAdmin =require('../middleware/authAdmin')


router.route('/foodtype')
    .get(FoodTypeCtrl.getFoodTypes)
    .post(auth, authAdmin, FoodTypeCtrl.createFoodType)

router.route('/foodtype/:id')
    .delete(auth, authAdmin, FoodTypeCtrl.deleteFoodType)
    .put(auth, authAdmin, FoodTypeCtrl.updateFoodType)







module.exports= router