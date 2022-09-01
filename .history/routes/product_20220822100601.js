import express from 'express';
import fs from 'fs';
const router = express.Router();

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
    fs.readFile('./data/data.json', (err, data) => {
        if (err) console.log(err)
        else {
            console.log(data.toString())
            data = JSON.parse(data.toString());
            products = [...data];
            console.log(req.body)
            if (req.body.name && req.body.quantity && req.body.price && req.body.manufacturer) {
                products.push(req.body);
                fs.writeFile("./data/data.json", products, (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("File written successfully\n");
                        res.send("your product added successfully!")
                    }
                });

            }
            else {
                res.send("this request should contain name,quantity,price,manufacturer")
            }
        }
    })
})

export default router;