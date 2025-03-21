"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const daily_contoller_1 = __importDefault(require("../controllers/daily.contoller"));
const dailyRouter = (0, express_1.Router)();
dailyRouter.get('/', daily_contoller_1.default.getAlldailys);
dailyRouter.get('/search', daily_contoller_1.default.searchKenny);
dailyRouter.get('/:id', daily_contoller_1.default.getDaily);
dailyRouter.put('/:id', daily_contoller_1.default.editDailyById);
dailyRouter.post('/', daily_contoller_1.default.addNewDaily);
dailyRouter.delete('/:id', daily_contoller_1.default.deleteDailyById);
exports.default = dailyRouter;
