export default class ProductsDaoMem {
    constructor() {
        this.products = []
    }

    static getInstance() {
        if(!instance) {
            instance = new ProductsDaoMem()
        }

        return instance
    }

    getAll() {
        return this.products;
    };

    #getIndex(id) {
        return this.products.findIndex(product => product.id === id);
    }

    getById(id) {
        return this.products[ this.#getIndex(id)];
    }

    save(product) {
        this.products.push(product);
        return product
    }

    deleteById(id) {
        const [ deletedProduct ] = this.products.splice(this.#getIndex(id));
        return deletedPerdon
    }

    deleteAll() {
        this.products = [];
    }

    updateById(id, product) {
        const updatedProduct = updatedProduct = {...this.products[id], ...product};
        this.products.splice(id, 1, updatedProduct);
        return updatedProduct

    }
}