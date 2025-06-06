import express from 'express';
import router from './routes/todo.routes';

const app = express();

app.use(express.json());

app.use('/todo', router);

app.listen(8000, () => {
    console.log('the application is listening port 8000!');
})