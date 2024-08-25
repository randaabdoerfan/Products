const Joi = require('joi')
const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        trim : true,
        minlength : 3,
        maxlength : 200

    },
    category : {
        type : String,
        required: true,
        trim : true,
        minlength : 3,
        maxlength : 200

    },
    image : {
        type : String,
        required: true,
        trim : true,
        minlength : 3,
        maxlength : 100

    },
    new_price:{
        type: Number,
        required : true
    },
    old_price :{
        type: Number,
        required : true
    }
},{
    timestamps:true
})



    function validateCreateProduct(obj) {
        const schema =Joi.object({
            name : Joi.string().trim().min(3).max(100).required(),
            category : Joi.string().trim().min(3).max(200).required(),
            image : Joi.string().trim().min(3).max(200),
            new_price : Joi.number().required(),
            old_price : Joi.number().required()
        })
        return schema.validate(obj)
        
    } 


    function validateUpdateProduct(obj) {
        const schema =Joi.object({
            name : Joi.string().trim().min(3).max(100),
            category : Joi.string().trim().min(3).max(200),
            image : Joi.string().trim().min(3).max(200),
            new_price : Joi.number(),
            old_price : Joi.number()
        })
        return schema.validate(obj)
        
    } 

const Product = mongoose.model("Product",productsSchema)

module.exports = {Product
    ,validateCreateProduct
    ,validateUpdateProduct
}