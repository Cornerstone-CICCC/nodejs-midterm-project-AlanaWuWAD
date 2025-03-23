"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = void 0;
const checkLogin = (req, res, next) => {
    if (req.session && req.session.isLogin) {
        next();
        return;
    }
    res.status(403).json({ message: `You are not login !` });
};
exports.checkLogin = checkLogin;
