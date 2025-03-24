import { Request, Response } from "express";
import userModel from "../models/home.model";
import { User } from "../type/user";
import { error } from "console";

//get all users
const getAllusers = (req: Request, res:Response) =>{
    const users = userModel.findAll()
    res.json(users)
}

//getUserByUsername
const getUserByUsername = (req: Request, res: Response) =>{
    if( !req.session || !req.session.username) {
        res.status(500).send(`User is not logged in !`)
    }
    if((req.session && req.session.username)){
        const user = userModel.findByUsername (req.session.username)
        if(!user){
            res.status(500).send(`User not found !`)
            return
        }
        res.json(user)
    }
}

//addUser
const addUser = async (req:Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const {username, password} = req.body
    if(!username || !password){
        res.status(500).json({error:`Wrong user info !`})
        return
    }
    const user = await userModel.createUser({username, password})
    if(!user){
        res.status(409).json({error:'The usename is taken !'})
    }
    res.status(201).json(user)
}

//login
const login = async (req: Request, res: Response) =>{
    const { username, password} = req.body
    if(!username || !password){
        res.status(500).json({error:`Username or password is empty !`})
    }

    const user = await userModel.logIn( username, password)
    if(!user){
        // res.status(500).send(`Wrong info !`)
        res.status(500).json({error: `Wrong info !`})
        return
    }
    if(req.session){
        req.session.isLogin = true
        req.session.username = user.username
    }
    res.send(`Login successfully !`)
}

//logout
const logout = (req: Request, res:Response) => {
    req.session = null
    // res.status(200).send(`Logout successfully !`)
    res.status(301).redirect('/login')
}


export default {
    getAllusers,
    getUserByUsername,
    addUser,
    login,
    logout
}