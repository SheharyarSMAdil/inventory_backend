import express from 'express';
const router = express.Router();
import * as controller from "../controller/product.js"

router.get('/', controller.getAllProducts)
router.post('/', controller.addProduct)
router.patch('/:id', controller.updateProduct)
router.delete('/:id', controller.removeProduct)

export default router;