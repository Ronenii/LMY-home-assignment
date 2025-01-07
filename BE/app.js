import dotenv from 'dotenv';
import express from 'express';
import task from './route/task.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
const TASK_ROUTE = process.env.TASK_API_ROUTE || '/api/task';


// Middleware

// Json parser
app.use(express.json());

// Routes
app.use(TASK_ROUTE, task)

app.use('*', (req, res, next) => {
    res.status(404).json({
        message: 'Route not found'
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})