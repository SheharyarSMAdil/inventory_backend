import { Router } from 'express';

const router = Router();

let users = [{
    userName: "Administrator",
    password: "adminPass"
}];

router.get('/', (req, res) => {
    console.log('Hello from user')
    res.send(users)
})

router.post('/', (req, res) => {
    users.push(req.body);
    res.send(JSON.stringify({ msg: "successfully Added!" }))
})

export default router;