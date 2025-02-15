import { Router } from 'express';

const authRouter = Router();

authRouter.get('/sign-up', (req, res) => res.send({ title: 'Sign up' })) // GET /sign-up;
authRouter.post('/sign-in', (req, res) => res.send({ title: 'Sign in' })) // GET /sign-up;
authRouter.post('/sign-out', (req, res) => res.send({ title: 'Sign out' })) // GET /sign-up;

export default authRouter;