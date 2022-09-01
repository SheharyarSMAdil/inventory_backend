import Router from 'express-router';

const router = Router();

router.use('/', () => {
    console.log('Hello from user')
})