import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
let products = [];


export const getAllProducts = (req, res) => {
    fs.readFile('./data/data.json', (err, data) => {
        if (err) console.log(err)
        else {
            console.log(data)
            res.send(data.toString())
        }
    })
}

export const addProduct = (req, res) => {
    if (req.body.name && req.body.quantity && req.body.price && req.body.manufacturer) {
        fs.readFile('./data/data.json', (err, data) => {
            if (err) console.log(err)
            else {
                data = JSON.parse(data.toString());
                products = [...data];
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
}

export const updateProduct = (req, res) => {
    fs.readFile('./data/data.json', (err, data) => {
        if (err) console.log(err)
        else {
            data = JSON.parse(data.toString());
            products = [...data];
            const { id } = req.params;
            console.log(products)
            console.log(id)
            let selectedProduct = products.find(product => product.uid === id);
            if (req.body.quantity) selectedProduct.quantity = req.body.quantity
            if (req.body.name) selectedProduct.name = req.body.name
            if (req.body.price) selectedProduct.price = req.body.price
            if (req.body.manufacturer) selectedProduct.manufacturer = req.body.manufacturer
            console.log(products);
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
}