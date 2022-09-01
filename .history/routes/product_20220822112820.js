import express from 'express';
const router = express.Router();
import * as controller from "../controller/product.js"

router.get('/', controller.getAllProducts)

router.post('/', controller.addProduct)

router.patch('/:id', controller.updateProduct)

router.delete('/:id', (req, res) => {

    fs.readFile('./data/data.json', (err, data) => {
        if (err) console.log(err)
        else {
            data = JSON.parse(data.toString());
            products = [...data];
            const { id } = req.params;
            console.log(products)
            console.log(id)
            products = products.filter(product => product.uid !== id);
            console.log(products);
            fs.writeFile("./data/data.json", JSON.stringify(products), (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                    res.send({ msg: "your product deleted successfully!", products })
                }
            });
        }
    })
})



export default router;