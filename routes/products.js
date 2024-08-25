const express = require('express')

const { Product , validateCreateProduct ,validateUpdateProduct} = require('../models/Products')
const router = express.Router()



////////////////////////////////////////all products //////////////////////////////

router.get('/' ,async (req,res) =>{
    const allProducts = await Product.find()
    res.json(allProducts)
})
///////////////////////////// book by id///////////////////////
router.get('/:id',async(req,res)=>{
    const product = await Product.findById((req.params.id))
    if (product){
        res.json(product)
    }
    else{
        res.json({message :"the product is not found"})
    }
})

//////////////////////////post ////////////////////////////

router.post('/',async(req,res)=>{
        
    const {error} = validateCreateProduct(req.body)
    if (error){
        return res.json(error.details[0].message)
    }

    const product = new Product({
        name : req.body.name,
        category : req.body.category,
        image : req.body.image,
        new_price : req.body.new_price,
        old_price : req.body.old_price,
        }) 
        const result = await product.save()
        res.json(result)
    
})


//////////////////////////////////update //////////////////////
router.put('/:id' , async(req,res)=>{
    const { error } = validateUpdateProduct(req.body)
    if (error){
        return res.json(error.details[0].message)
    }
    const product = await Product.findById(req.params.id)

    if (product){
        const newProduct= await Product.findByIdAndUpdate(req.params.id,{
            $set:{
                name : req.body.name,
                category : req.body.category,
                image : req.body.image,
                new_price : req.body.new_price,
                old_price : req.body.old_price}},{new:true})
            res.json(newProduct)
    
    }
    else {
        res.json({message:"product is not found "})
    }
})
/////////////////////////////////delete ////////////////////////////
router.delete('/:id',async (req,res)=>{
    const product = await Product.findById((req.params.id))
if (product){
    await Product.findByIdAndDelete(req.params.id)
    res.json({message :"product is deleted"})
 }
 else{
     res.json({message :"the product is not found"})
 }
})


///////////////////////////////EXPORT module ///////////////////////
module.exports = router
