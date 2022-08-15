  
const mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min:5,
        max:50
    }, 
    number: {
        type: String,
        required:true,
        trim:true,
        max:12,
        min:10
    },
    pincode : {
        type:String,
        required:true,
        trim:true,
        min:6,
        max:6
    },
    locality : {
        type: String,
        required: true,
        trim: true,
        min:3,
        max:50
    },
    address : {
        type : String ,
        required:true,
        trim:true,
        max:300,
        min:10
    },
    city : {
        type:String ,
        required:true,
        trim:true,
        max:20,
        min:3
    },
    landmark : {
        type:String ,
        trim:true,
        max:30,
        min:3
    },
    alternate : { //alternate phone number
        type: String,
        trim:true,
        max:12,
        min:10
    },
    state : {
        type:String ,
        required:true,
        trim:true,
        max:20,
        min:3
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Address", addressSchema)