import {Request, Response, NextFunction} from "express"
import passport from "../middleware/passportMiddleware"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import prisma from "../util/database"

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
			passport.authenticate("local",{failureRedirect:"/"},(err,user,info) =>{

				if(!user) return res.status(401).json({msg:"username and password incorrect"})

				req.login(user,(err) => {
					if (err) return res.status(500).json({msg:err.message})	
					const token = jwt.sign(user,process.env.JWT_SECRET as string)
					res.cookie("refreshtoken",token,{
						httpOnly: true,
						path: '/user/refreshToken',
						maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
						secure: true
					})
					res.status(200).json({user,token})
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
				res.clearCookie('refreshToken', { path: '/user/refresh_token' });
				req.session.destroy((err) =>{
					res.clearCookie('connect.sid')
					res.status(204).end()
				})
			})
		}catch(err:any){
			res.status(500).json({message: err.message});
		}
	},
	getUser: async (req: Request, res: Response, next: NextFunction) =>{
		try{
			const {id,username}:any = req.user
			res.status(200).json({id,username})
		}catch(err:any){
			res.status(500).json({message: err.message});
		}
	},
	isLogin: async (req: Request, res: Response, next: NextFunction) =>{
		try{
			const status = req.isAuthenticated()
			res.status(200).json({status:status})
		}catch(err:any){
			res.status(500).json({message: err.message});
		}
	}
}


module.exports = userController