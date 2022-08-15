const router = require('express').Router()
const bannerCtrl =require('../controllers/bannerCtrl')
// const auth =require('../middleware/auth')
// const authAdmin =require('../middleware/authAdmin')


router.route('/banners')
    .get(bannerCtrl.getBanner)
    .post( bannerCtrl.createBanner)

router.route('/banners/:id')
    .delete( bannerCtrl.deleteBanner)
    .put(bannerCtrl.updateBanner)

module.exports = router