"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_controllers_1 = require("../controllers/portfolio.controllers");
const portfolioRouter = (0, express_1.Router)();
portfolioRouter.get('/:walletAddress', portfolio_controllers_1.getPortfolio);
exports.default = portfolioRouter;
