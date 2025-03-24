import { Router } from "express";
import dailyContoller from "../controllers/daily.contoller";

const dailyRouter = Router()

dailyRouter.get('/',dailyContoller.getAlldailys)
dailyRouter.get('/search',dailyContoller.searchKenny)
dailyRouter.get('/:id',dailyContoller.getDaily)
dailyRouter.put('/:id',dailyContoller.editDailyById)
dailyRouter.post('/',dailyContoller.addNewDaily)
dailyRouter.delete('/:id',dailyContoller.deleteDailyById)

export default dailyRouter 