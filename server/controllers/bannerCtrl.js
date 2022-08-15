const Banner =require('../models/bannerModel')


const bannerCtrl ={
    getBanner: async(req,res) =>{
        try {
            const banners =await Banner.find()
            res.json(banners)
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
    createBanner: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {name,images} = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" })
           
           

            const newBanner = new Banner({name,images})

            await newBanner.save()
            res.json({msg: "Created a banner"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteBanner: async(req, res) =>{
        try {
            // const products = await Products.findOne({category: req.params.id})
            // if(products) return res.status(400).json({
            //     msg: "Please delete all products with a relationship."
            // })

            await Banner.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Banner"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBanner: async(req, res) =>{
        try {
            const {name,images} = req.body;
            await Banner.findOneAndUpdate({_id: req.params.id}, {name,images})

            res.json({msg: "Updated a banner"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}
module.exports=bannerCtrl