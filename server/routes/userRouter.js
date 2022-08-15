const router = require('express').Router()
const userCtrl =require('../controllers/userCtrl')
// const {register} =require('../controllers/userCtrl')
const auth = require('../middleware/auth')


router.post('/register',userCtrl.register) 



router.post('/login',userCtrl.login) 

router.get('/logout',userCtrl.logout) 

router.get('/refresh',userCtrl.refreshToken) 

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/infor', auth,userCtrl.getUser)

router.get('/all_infor', auth, userCtrl.getUsersAllInfor)

router.patch('/addcart',auth,userCtrl.addCart)
router.post('/cart',auth,userCtrl.updateCart) 

router.get('/history',auth,userCtrl.history)

router.post('/address/:id', auth,userCtrl.addAddress) 
router.delete('/address/:id', auth,userCtrl.deteleAddress)//id : user's id 
router.post('/update-address/:id', auth,userCtrl.editAddress)  

router.post('/order/:id',auth,userCtrl.order) ; 
router.post('/update/:id',userCtrl.updateStatus) ;


router.get('/status',userCtrl.status) ;

router.patch('/update', auth, userCtrl.updateUser)
router.post('/review',auth,userCtrl.addReview) ; 
router.get('/review',userCtrl.getReviews) ;
router.put('/review',auth,userCtrl.updateReview) ;
router.delete('/review/:order_id',auth,userCtrl.deleteReview) ;
// router.post('/sendOTP',userCtrl.sendOTP) ;
// router.post('/verifyOTP',userCtrl.verifyOTP) ;







module.exports = router