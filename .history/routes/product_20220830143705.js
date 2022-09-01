import express from 'express';
const router = express.Router();
import * as products from "../controller/product.js"
import multer from 'multer';

var storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, './public/uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage, fileFilter
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


router.get('/', products.getAllProducts)
router.post('/', products.addProduct)
router.post('/upload', upload.single("file"), async (req, res) => {
    const tempPath = req.file.path;
    const targetPath = "./uploads/image.png";

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            res
                .status(200)
                .contentType("text/plain")
                .end("File uploaded!");
        });
    } else {
        fs.unlink(tempPath, err => {
            if (err) return handleError(err, res);

            res
                .status(403)
                .contentType("text/plain")
                .end("Only .png files are allowed!");
        });
    }
})
router.patch('/:id', products.updateProduct)
router.delete('/:id', products.removeProduct)

export default router;