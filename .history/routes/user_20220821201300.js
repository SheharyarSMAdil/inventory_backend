import { Router } from 'express';

const router = Router();

let users = [{
    userName: "Administrator",
    password: "adminPass"
}];

router.get('/', (req, res) => {
    console.log('Hello from user')
    res.send("Hello from user")
})

export default router;