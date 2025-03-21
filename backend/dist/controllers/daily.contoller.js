"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const daily_model_1 = __importDefault(require("../models/daily.model"));
const getAlldailys = (req, res) => {
    const dailys = daily_model_1.default.browseDaily();
    res.status(200).json(dailys);
};
const getDaily = (req, res) => {
    const { id } = req.params;
    const daily = daily_model_1.default.readDaily(id);
    if (!daily) {
        res.status(404).json(daily);
    }
    res.json(daily);
};
const addNewDaily = (req, res) => {
    const { title, date, age, description } = req.body;
    if (!title || !date) {
        res.status(500).json({ message: `Please fill in Title and Date` });
        return;
    }
    const daily = daily_model_1.default.addDaily({ title, date, age, description });
    res.json(daily);
};
const deleteDailyById = (req, res) => {
    const { id } = req.params;
    daily_model_1.default.deleteDaily(id);
    res.json({ message: `${id} is deleted!` });
};
const searchKenny = (req, res) => {
    const { title } = req.query;
    const kenny = daily_model_1.default.searchDaily(title);
    if (!kenny) {
        res.status(404).json({ error: `Kenny is alive!` });
    }
    res.json(kenny);
};
const editDailyById = (req, res) => {
    const { id } = req.params;
    const { title, date, age, description } = req.body;
    const editContent = daily_model_1.default.editDaily(id, { title, date, age, description });
    if (!editContent) {
        res.json({ error: ` Not found ID!` });
    }
    res.json(editContent);
};
exports.default = {
    getAlldailys,
    addNewDaily,
    getDaily,
    deleteDailyById,
    searchKenny,
    editDailyById
};
