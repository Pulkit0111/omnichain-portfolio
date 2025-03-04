import express from 'express';
import dotenv from 'dotenv';
import { config } from 'dotenv';
import cors from 'cors';
import portfolioRouter from './routes/portfolio.routes';
import { connectToDatabse } from "./config/dataBase"

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
  console.log(`Server is running on port ${port}`);
});
