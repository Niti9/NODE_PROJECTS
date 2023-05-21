import express from 'express';
import createUser from '../controller/auth.js'

const authRouter = express.Router() // to initialize router

authRouter.post('/signUp', createUser) 


export default authRouter;