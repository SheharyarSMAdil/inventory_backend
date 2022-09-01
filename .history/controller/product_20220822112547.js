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