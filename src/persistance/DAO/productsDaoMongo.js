import { Product } from "../mongo-models/product-model.js";

class ProductsDaoClass {
    async getAllProducts(){
        try{
            const list = await Product.find({})
            return list
        }catch(error){
            logger.error("Error getAllProducts-DAO: " + error)
        }
    }

    async saveProduct(product){
        try{
            const saveProd = await Product(product).save()
            return saveProd
        }catch(error){
            logger.error("Error saveProducts-DAO: " + error)
        }
    } 

    async getByIdProduct(idProduct){
        try {
            const getByIdProd = await Product.findById(idProduct)
            return getByIdProd
        } catch(error){
            logger.error("Error in getByIdProduct-DAO: " + error)
        }
    }

    async updateProduct(idProduct, data){
        try {
            const updateProd = await Product.findByIdAndUpdate(idProduct, data)
            return updateProd
        } catch(error){
            logger.error("Error in updateProducts-DAO: " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            const deleteProd = await Product.findByIdAndDelete(idProduct)
            return deleteProd
        }catch (error) {
            logger.error("Error in deleteProduct-DAO: " + error)
        }
    } 

    async getProductsByCategory(category){
        try {
            const productsByCategory = await Product.find({ category })
            return productsByCategory
        } catch (error) {
            logger.error("Error in getProductsByCategory: " + error)
        }
    }
}

export default ProductsDaoClass