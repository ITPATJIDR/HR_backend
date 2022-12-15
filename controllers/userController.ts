import {Request, Response, NextFunction} from "express"
import passport from "../middleware/passportMiddleware"
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

const userController = {
	register: async (req: Request, res: Response,next: NextFunction) => {
		try{
			const {username,password} = req.body;
			const checkUserExists = await prisma.user.findUnique({
				where:{
					username: username
				}
			})

			const paswordHash = await bcrypt.hash(password,12)
			if (checkUserExists != null){
				res.status(400).json({msg:"username is already in use"})
			}else{
				await prisma.user.create({
					data:{
						username: username,
						password: paswordHash,
					}
				})
				res.status(200).json({msg:"Create user successfully!!!"})
			}
		}catch(err:any){
			res.status(500).json({message: err.message});
		}
	},
	login:async (req:Request, res: Response, next: NextFunction) => {
		try{
			passport.authenticate("local",(err,user,info) =>{
				if(!user) return res.status(401).json({msg:"username and password incorrect"})
				req.login(user,(err)=>{
					if (err) throw err;
					res.status(201).json({user})
					console.log(req.isAuthenticated())
				})
			})(req,res,next)
		}catch(err:any){
			res.status(500).json({message: err.message});
		}
	},
	logout: async (req: Request, res: Response, next: NextFunction) =>{
		try{
			req.logOut((err) =>{
				if (err) { return next(err)}
				res.status(204).end()
			})
		}catch(err:any){
			res.status(500).json({message: err.message});
		}
	},
	getUser: async (req: Request, res: Response, next: NextFunction) =>{
		try{
			let user:any
			res.status(200).json({user})
		}catch(err:any){
			res.status(500).json({message: err.message});
		}
	}
}


module.exports = userController