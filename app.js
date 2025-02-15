import express from 'express';
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDB from './database/mongodb.js';

const app = express();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('<h1>Is this working?</h1>');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port 3000 on http://localhost:${PORT}`);

    await connectDB();
});

export default app;