"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const home_route_1 = __importDefault(require("./routes/home.route"));
const daily_route_1 = __importDefault(require("./routes/daily.route"));
dotenv_1.default.config();
//create server
const app = (0, express_1.default)();
//MW
const SING_KEY = process.env.COOKIE_SIN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SING_KEY || !ENCRYPT_KEY) {
    throw new Error("Missing cookie keys!");
}
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [SING_KEY, ENCRYPT_KEY],
    // maxAge: 15*6*1000
}));
app.use((0, express_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:4321', //Astro port
    credentials: true //allow cookies
}));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, '../uploads'))); //to read static files
//routes
app.use('/', home_route_1.default);
app.use('/daily', daily_route_1.default);
//404
app.use((req, res) => {
    res.status(404).send(`Page not found!`);
});
//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is ${PORT}`);
});
