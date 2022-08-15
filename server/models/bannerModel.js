const mongoose = require('mongoose')



const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
     images:{
        type: Object,
        required: true
    },
    
    

    

    
    
    
  
}, {
    timestamps: true
})


module.exports = mongoose.model("Banner", bannerSchema)