import express from 'express'
import path from 'path'
import cookiSession from 'cookie-session'
import cors from 'cors'
import homeContrller from './controllers/home.contrller'
import dotenv from 'dotenv'
import homeRouter from './routes/home.route'
import dailyRouter from './routes/daily.route'
dotenv.config()

//create server
const app = express()

//MW
const SING_KEY = process.env.COOKIE_SIN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if(!SING_KEY || !ENCRYPT_KEY){
    throw new Error ("Missing cookie keys!")
}
app.use(cookiSession({
    name:'session',
    keys:[ SING_KEY, ENCRYPT_KEY],
    maxAge: 5*6*1000
}))
app.use(express())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4322', //Astro port
    credentials: true  //allow cookies
}))

//routes
app.use('/', homeRouter)
app.use('/daily', dailyRouter)

//404
app.use((req, res)=>{
    res.status(404).send(`Page not found!`)
})

//start server
const PORT = process.env.PORT || 3000
app.listen( PORT, ()=>{
    console.log(`Server is ${PORT}`)
})