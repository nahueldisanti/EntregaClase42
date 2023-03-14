import ProductsFactoryDao from "../persistance/models/DAO/productosDao/productsFactory.js"

const productsDaoFactory = ProductsFactoryDao.getDao();

export async function getAll() {
    return await productsDaoFactory.getProducts();
};

export async function save(product) {
    return await productsDaoFactory.saveProduct(product);
};

export async function getProductById(id) {
    return await productsDaoFactory.getProduct(id);
};

export async function deteleteById(id) {
    return await productsDaoFactory.deleteProduct(id);
};

export async function updateById(id, newProduct) {
    return await productsDaoFactory.updateProduct(id, newProduct);
};

