import { Request, Response } from "express";
import dailyModel from "../models/daily.model";
import { Daily } from "../type/daily";

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
    if (!title || !date) {
        res.status(500).json({ message: `Please fill in Title and Date` })
        return
    }
    const daily = dailyModel.addDaily({ title, date, age, description })
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
    const { title, date, age, description } = req.body
    const editContent = dailyModel.editDaily(id, { title, date, age, description })
    if(!editContent) {
        res.json({error:` Not found ID!`})
    }
    res.json(editContent)

}


export default {
    getAlldailys,
    addNewDaily,
    getDaily,
    deleteDailyById,
    searchKenny,
    editDailyById
}