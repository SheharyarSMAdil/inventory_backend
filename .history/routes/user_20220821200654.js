import Router from 'express-router';

const router = Router();

router.get('/', (req, res) => {
    console.log('Hello from user')
    res.send("Hello from user")
})