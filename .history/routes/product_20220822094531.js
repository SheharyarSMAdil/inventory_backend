import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('../data/data.json', (err, data) => {
        if (err) console.log(err)
        else {
            console.log(data)
        }
    })
})