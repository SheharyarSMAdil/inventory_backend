import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

let products = [];

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};



const uploadImage = async (req, res) => {
    if (req.file) {
        const pathName = req.file.path;
        res.send("uploaded")
    }
    // const tempPath = req.file.path;
    // const targetPath = path.join(__dirname, "./uploads/image.png");

    // if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    //     fs.rename(tempPath, targetPath, err => {
    //         if (err) return handleError(err, res);

    //         res
    //             .status(200)
    //             .contentType("text/plain")
    //             .end("File uploaded!");
    //     });
    // } else {
    //     fs.unlink(tempPath, err => {
    //         if (err) return handleError(err, res);

    //         res
    //             .status(403)
    //             .contentType("text/plain")
    //             .end("Only .png files are allowed!");
    //     });
    // }
}

export const getAllProducts = (req, res) => {
    fs.readFile('./data/data.json', (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            // console.log(data)
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
                        res.send({ msg: "your product added successfully!" })
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
    console.log(req)
    if (req.params.id) {
        fs.readFile('./data/data.json', (err, data) => {
            if (err) console.log(err)
            else {
                data = JSON.parse(data.toString());
                products = [...data];
                const { id } = req.params;
                console.log(products)
                console.log(id)

                let selectedProduct = products.find(product => product.uid === id);
                console.log(selectedProduct);
                if (selectedProduct) {
                    if (req.body.quantity) selectedProduct.quantity = req.body.quantity
                    if (req.body.name) selectedProduct.name = req.body.name
                    if (req.body.price) selectedProduct.price = req.body.price
                    if (req.body.manufacturer) selectedProduct.manufacturer = req.body.manufacturer
                    if (req.body.image) selectedProduct.image = req.body.image
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
                else {
                    res.send({ error: "Id not found" })
                }
            }
        })
    }
    else {
        res.send({ error: "Please Provide Unique Id" })
    }
}

export const removeProduct = (req, res) => {

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
}