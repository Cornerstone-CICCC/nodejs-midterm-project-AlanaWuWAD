import { Router } from "express";
import homeContrller from "../controllers/home.contrller";
import { checkLogin } from "../middleware/auth.mw";

const homeRouter = Router()

homeRouter.get('/', homeContrller.getAllusers)
homeRouter.get('/check-auth', homeContrller.getUserByUsername)
homeRouter.post('/login', homeContrller.login)
homeRouter.post('/signup' ,homeContrller.addUser)
homeRouter.get('/logout', homeContrller.logout)

export default homeRouter
