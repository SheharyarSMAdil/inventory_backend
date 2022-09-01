import express from 'express';
import fs from 'fs';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

let products = [];

router.get('/', (req, res) => {
    fs.readFile('./data/data.json', (err, data) => {
        if (err) console.log(err)
        else {
            console.log(data)
            res.send(data.toString())
        }
    })
    // res.send(products)
})

router.post('/', (req, res) => {
    if (req.body.name && req.body.quantity && req.body.price && req.body.manufacturer) {
        fs.readFile('./data/data.json', (err, data) => {
            if (err) console.log(err)
            else {
                // console.log(data.toString())
                data = JSON.parse(data.toString());
                products = [...data];
                // console.log(req.body)

                products.push({ ...req.body, uid: uuidv4() });
                fs.writeFile("./data/data.json", JSON.stringify(products), (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("File written successfully\n");
                        res.send("your product added successfully!")
                    }
                });
            }
        })
    }
    else {
        res.send("this request should contain name, quantity, price, manufacturer")
    }
})

router.patch('/:id', (req, res) => {

    fs.readFile('./data/data.json', (err, data) => {
        if (err) console.log(err)
        else {
            // console.log(data.toString())
            data = JSON.parse(data.toString());
            products = [...data];

            const { id } = req.params;
            console.log(products)
            console.log(id)

            let selectedProduct = products.find(product => product.uid === id);

            console.log(selectedProduct);

            console.log(req.body.name)

            selectedProduct.name = !!req.body.name && req.body.name;
            selectedProduct.quantity = !!req.body.quantity && req.body.quantity;
            selectedProduct.price = !!req.body.price && req.body.price;
            selectedProduct.manufacturer = !!req.body.manufacturer && req.body.manufacturer;

            console.log(products);
            // products.push({ products, selectedProduct });

            fs.writeFile("./data/data.json", JSON.stringify(products), (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                    res.send({ msg: "your product updated successfully!", products })
                }
            });
        }
    })

})

export default router;