const Product = require("../../models/product.model")


const getAllProducts=async(req,res)=>{
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
}

module.exports = {
    getAllProducts
}