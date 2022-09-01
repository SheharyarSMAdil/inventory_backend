import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from "./routes/user.js"
import productRoutes from "./routes/product.js"
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/product', userRoutes);

app.get('/', (req, res) => {
    console.log('[TEST]!')
    res.send('hello from homepage.')
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
});