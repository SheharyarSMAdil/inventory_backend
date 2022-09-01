import express from 'express';
const router = express.Router();
import * as products from "../controller/product.js"

router.get('/', products.getAllProducts)
router.post('/', products.addProduct)
router.post('/upload', products.uploadImage)
router.patch('/:id', products.updateProduct)
router.delete('/:id', products.removeProduct)

export default router;