const Product = require("../../../models/product.model")

const addProduct = async(req, res) =>{
    try {
        const {name,description,price,isAvailable,merchant_name} = req.body
        if(!name || !description ||!price || !isAvailable || !merchant_name){
            return res.status(400).json({message:"Please Add all the required fields"})
        }
        const productExists = await Product.findOne({name}).sort({ createdAt: -1 }).catch((err)=>{
            return res.status(500).json({message: "internal Server error"})
         })
        if(productExists){
            return  res.status(400).json({message: "Duplicate product"})
        }
        const product = await Product.create({
            name,
            description,
            price,
            isAvailable,
            merchant_name
        }).catch((err)=>{
            return res.status(500).json({message: "internal Server error",err:err})

        })
        if(product){
            return res.status(200).json({message:"Product Added successfully"})
        }   
    } catch (error) {
        return res.status(500).json({message:"error"})
    
    }
}

const getAllProducts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const skip = (page - 1) * limit;
  
      const allProducts = await Product.find()
        .skip(skip)
        .limit(limit)
        .catch((err) => {
          return res.status(500).json({ message: "Internal Server Error" });
        });
  
      if (!allProducts || allProducts.length === 0) {
        return res.status(400).json({ message: "No Products Found" });
      }
  
      const totalProducts = await Product.countDocuments();
  
      res.status(200).json({
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        products: allProducts,
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

module.exports = {
    addProduct,
    getAllProducts
}