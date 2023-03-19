import ProductsDaoClass from './productsDaoMongo.js'
import ProductsDaoMem from './productsDaoMem.js'

const persistance = process.argv[2] || "mongodb";

let DAO


switch (persistance){
    case 'mem':
        DAO = ProductsDaoMem.getInstance();
        console.log('Cambiando a persitencia en Memoria local')
        break
    
        default: 
        DAO = ProductsDaoClass.getInstance();
        console.log('Cambiando a Persitencia en Base De datos relacional: MONGODB')
        break
};

class ProductsFactoryDao {

    static getDao() {
        return DAO
    }

}


export default ProductsFactoryDAO