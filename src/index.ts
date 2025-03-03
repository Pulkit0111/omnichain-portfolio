import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import portfolioRouter from './routes/portfolio';
config();

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
