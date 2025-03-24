"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_model_1 = __importDefault(require("../models/home.model"));
//get all users
const getAllusers = (req, res) => {
    const users = home_model_1.default.findAll();
    res.json(users);
};
//getUserByUsername
const getUserByUsername = (req, res) => {
    if (!req.session || !req.session.username) {
        res.status(500).send(`User is not logged in !`);
    }
    if ((req.session && req.session.username)) {
        const user = home_model_1.default.findByUsername(req.session.username);
        if (!user) {
            res.status(500).send(`User not found !`);
            return;
        }
        res.json(user);
    }
};
//addUser
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({ error: `Wrong user info !` });
        return;
    }
    const user = yield home_model_1.default.createUser({ username, password });
    if (!user) {
        res.status(409).json({ error: 'The usename is taken !' });
    }
    res.status(201).json(user);
});
//login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({ error: `Username or password is empty !` });
    }
    const user = yield home_model_1.default.logIn(username, password);
    if (!user) {
        // res.status(500).send(`Wrong info !`)
        res.status(500).json({ error: `Wrong info !` });
        return;
    }
    if (req.session) {
        req.session.isLogin = true;
        req.session.username = user.username;
    }
    res.send(`Login successfully !`);
});
//logout
const logout = (req, res) => {
    req.session = null;
    // res.status(200).send(`Logout successfully !`)
    res.status(301).redirect('/login');
};
exports.default = {
    getAllusers,
    getUserByUsername,
    addUser,
    login,
    logout
};
