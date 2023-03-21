import axios from "axios";
import { strictEqual } from 'assert'

let productId = "64191032103305a70517c2e9"


let productTest = {
    name: 'Marcador',
    price: 8.4,
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bikabik.com.ar%2Fproduct%2Flapicera-faber-castell-trilux-azul%2F&psig=AOvVaw1qzHrTTXBilRw_I56ku3ck&ust=1679449491347000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJjAtoTz6_0CFQAAAAAdAAAAABAE",
    category:"Utiles", 
    description: "Marcador fluorescente rosa",
    stock: 100
}

const url = "http://localhost:8080";

const getProduct = () => axios.get(url);
const postProduct = (product) => axios.post(url, product);
const deleteProduct = (id) => axios. delete(`${url}/${idd}`)

describe('Probando API CRUD.', function () {

    before(function () {
        console.log('\n********* Comienzo TOTAL de Test *********')
    })

    after(function () {
        console.log('\n********* Fin TOTAL de Test *********')
    })

    beforeEach(function () {
        console.log('\n********* Comienzo Test *********')
    })

    afterEach(function () {
        console.log('********* Fin Test *********\n')
    })

    it('Deberia traer los productos', async () =>{
        const allProducts = await getProduct;
        console.log(allProducts.data)
        assert.notStrictEqual(allProducts, undefined)
    })

    it("Deberia hacer POST de UN producto", async () =>{
        const savedProduct = await postProduct(productTest);
        console.log(savedProduct.data);
        assert.strictEqual(savedProduct.name, productTest.name)
    })

    it("Deberia eliminar el producto dado cierto ID", async () => {
        const deletedProduct = await deleteProduct(productId);
        assert.strictEqual(productId, dletedProduct.id)
    })

})

