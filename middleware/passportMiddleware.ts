import {Request, Response, NextFunction} from "express";
import {Strategy as LocaleStrategy} from "passport-local"
import { PrismaClient } from '@prisma/client'
import passport from "passport";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

passport.use(new LocaleStrategy({
	usernameField: "username",
	passwordField: "password",
}, async (username, password,done) => {
	const user = await prisma.user.findUnique({
		where:{
			username:username
		}
	})
	if (user && await passwordCompare(password,user!.password)){
		done(null,user)
	}else{
		done(null,false)
	}
}));


passport.serializeUser((user:any,done) =>{
	done(null,user.id)
})

passport.deserializeUser(async ( req: Request, id:any, done:any) =>{
	try {
		const user = await prisma.user.findUnique({
			where:{
				id:id
			}
		})
		done(null,user)
	} catch (error) {
		done(error)	
	}
})

const passwordCompare = async (password:string, userPassword:string) => {
	 return await bcrypt.compare(password,userPassword)
}

export default passport 