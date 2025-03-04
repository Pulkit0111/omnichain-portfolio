"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const portfolio_routes_1 = __importDefault(require("./routes/portfolio.routes"));
const dataBase_1 = require("./config/dataBase");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/portfolio', portfolio_routes_1.default);
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server is running"
    });
});
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.listen(port, () => {
    (0, dataBase_1.connectToDatabse)();
    console.log(`Server is running on port ${port}`);
});
