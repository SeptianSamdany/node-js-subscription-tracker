import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({ title: 'GET all Users' })) // GET Users;
userRouter.get('/:id', (req, res) => res.send({ title: 'GET User Details' })) // GET user details;
userRouter.post('/', (req, res) => res.send({ title: 'CREATE new User' })) // CREATE user;
userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' })) // UPDATE user;
userRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE User' })) // DELETE user;

export default userRouter;