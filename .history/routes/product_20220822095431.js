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
            console.log(data)
            products = [...data];
            products.push(req.body)
        }
    })
})

export default router;