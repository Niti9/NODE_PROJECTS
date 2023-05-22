import express from 'express';
import {signUp,login} from '../controller/auth.js'

const authRouter = express.Router() // to initialize router

authRouter
.post('/signUp',signUp) 
.post('/login', login) 


export default authRouter;