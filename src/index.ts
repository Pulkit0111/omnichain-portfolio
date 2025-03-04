import express from 'express';
import dotenv from 'dotenv';
import { config } from 'dotenv';
import cors from 'cors';
import portfolioRouter from './routes/portfolio.routes';
import { connectToDatabse } from "./config/dataBase"

// Add these debug logs
console.log('=== Server Initialization Starting ===');
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/portfolio', portfolioRouter);

app.get("/health", (req,res) => {
    res.status(200).json({
        message: "Server is running"
    })
})

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
  connectToDatabse()
  console.log(`=== Server is running on port ${port} ===`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Current working directory:', process.cwd());
});
