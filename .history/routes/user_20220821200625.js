import Router from 'express-router';

const router = Router();

router.use('/', (req, res) => {
    console.log('Hello from user')
    res.send("Hello from user")
})