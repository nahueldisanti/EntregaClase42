import ProductsDaoClass from "../persistance/models/DAO/productosDao/productsDaoMongo.js"
const prodDao = new ProductsDaoClass()



class ProductsController {

    async getAllProducts(){
        try{
            const listProd = await prodDao.getAllProducts()
            return listProd
        }catch(error){
            logger.error("Error getAllProducts-Services " + error)
        }
    }

    async saveProduct(data){
        try{
            const newProduct = {
                timestamp: moment().format('L LTS'),
                name: data.name,
                description: data.description,
                category: data.category,
                url: data.url,
                price: data.price,
                stock: data.stock
            }
            const prodAdded = await prodDao.saveProduct(newProduct) 
            return prodAdded
        }catch(error){
            logger.error("Error saveProducts-Services " + error)
        }
    } 

    async getByIdProduct(idProduct){
        try {
            if (idProduct.length == 24) {
                const prod = await prodDao.getByIdProduct(idProduct)
                return prod
            } else {
                logger.warn('El ID ingresado es incorrecto')
            }
        } catch(error){
            logger.error("Error in getByIdProduct-Services " + error)
        }
    }

    async updateProduct(idProduct, data){
        try {
            if (idProduct.length == 24) {
                const updateProduct = {
                    timestamp: moment().format('L LTS'),
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    url: data.url,
                    price: data.price,
                    stock: data.stock
                }
                const updatedProduct = await prodDao.updateProduct(idProduct, updateProduct)
                return updatedProduct
            } else {
                logger.warn('El ID ingresado es incorrecto')
            }
        } catch(error){
            logger.error("Error in updateProducts-Services " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            if (idProduct.length == 24) {
                await prodDao.deleteProduct(idProduct)
            } else {
                logger.warn('El ID ingresado es incorrecto')
            }
        }catch (error) {
            logger.error("Error in deleteProduct-Services " + error)
        }
    } 

    async getProductsByCategory(category){
        try {
            const productsByCategory = await prodDao.getProductsByCategory(category)
            return productsByCategory
        } catch (error) {
            logger.error("Error in getProductsByCategory-Services " + error)
        }
    }
}

module.exports = ProductsServices