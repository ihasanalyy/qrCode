import express from 'express';
import { connectDB } from './Config/db.js';
import dotenv from 'dotenv';
import userRoutes from './Routes/qrCodeRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
const PORT = 8000;

connectDB();


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});