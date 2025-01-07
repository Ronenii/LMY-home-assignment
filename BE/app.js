import dotenv from 'dotenv';
import express from 'express'

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware

// Json parser
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task Manager');
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})