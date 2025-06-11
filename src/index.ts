import express from 'express';
import router from './routes/todo.routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(8000, () => {
    console.log('the application is listening port 8000!');
})