"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_contrller_1 = __importDefault(require("../controllers/home.contrller"));
const homeRouter = (0, express_1.Router)();
homeRouter.get('/', home_contrller_1.default.getAllusers);
homeRouter.get('/check-auth', home_contrller_1.default.getUserByUsername);
homeRouter.post('/login', home_contrller_1.default.login);
homeRouter.post('/signup', home_contrller_1.default.addUser);
homeRouter.get('/logout', home_contrller_1.default.logout);
exports.default = homeRouter;
