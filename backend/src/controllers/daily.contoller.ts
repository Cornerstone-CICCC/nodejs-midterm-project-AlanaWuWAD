import { Request, Response } from "express";
import dailyModel from "../models/daily.model";
import { Daily } from "../type/daily";
import multer, { StorageEngine} from "multer";
import {v4 as uuidv4} from 'uuid'

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination:string) => void) =>{
        cb(null, "uploads/");
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, File:string) => void) =>{
        cb(null, uuidv4() + "-" + file.originalname);
    }
})
const upload = multer({storage})

const getAlldailys = (req: Request, res: Response) => {
    const dailys = dailyModel.browseDaily()
    res.status(200).json(dailys)
}

const getDaily = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const daily = dailyModel.readDaily(id)
    if (!daily) {
        res.status(404).json(daily)
    }
    res.json(daily)
}


const addNewDaily = (req: Request<{}, {}, Omit<Daily, 'id' & 'description'>>, res: Response) => {
    const { title, date, age, description } = req.body
    const img = req.file ? `/uploads/${req.file.filename}`: null
    if (!title || !date) {
        res.status(500).json({ message: `Please fill in Title and Date` })
        return
    }
    const daily = dailyModel.addDaily({ title, date, img, age, description })
    res.json(daily)
}

const deleteDailyById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    dailyModel.deleteDaily(id)
    res.json({ message: `${id} is deleted!` })
}

const searchKenny = (req: Request<{}, {}, {}, { title: string }>, res: Response) => {
    const { title } = req.query
    const kenny = dailyModel.searchDaily(title)
    if (!kenny) {
        res.status(404).json({ error: `Kenny is alive!` })
    }
    res.json(kenny)
}

const editDailyById = (req: Request<{ id: string },{},Partial<Daily>>, res: Response) => {
    const { id } = req.params
    const { title, date, img, age, description } = req.body
    const editContent = dailyModel.editDaily(id, { title, date, img, age, description })
    if(!editContent) {
        res.json({error:` Not found ID!`})
    }
    res.json(editContent)

}


export default {
    getAlldailys,
    addNewDaily:[upload.single('img'),addNewDaily],
    getDaily,
    deleteDailyById,
    searchKenny,
    editDailyById
}