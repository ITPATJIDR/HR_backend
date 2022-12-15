import {Request, Response, NextFunction} from "express"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const employeeController = {
	createEmployee: async (req: Request, res: Response, next: NextFunction) =>{
		try{
			const {IDcard} = req.body
			const checkEmployeeExists = await prisma.employee.findUnique({
				where: {
					IDcard: IDcard
				}
			})

			if (checkEmployeeExists != null) {
				res.status(403).json({msg:"This Employee is already created"})
			}else{
				await prisma.employee.create({
					data:{...req.body}
				})
				res.json({msg:"Create Employee successfully"})
			}
		}catch(err:any){
			res.status(500).json({msg: err.message});
		}
	},
	resignEmployeeNow: async (req: Request, res: Response, next: NextFunction) =>{
		try{
			const {id} = req.body
			const resignDate = new Date()
			await prisma.employee.update({
				where:{
					id:id
				},data:{
					endAt: resignDate
				}
			})
			res.status(200).json({msg:"Resign Employee successfully!!!"})
		}catch(err:any){
			res.status(500).json({msg: err.message});
		}
	},
	resignEmployeeSetDate: async (req: Request, res: Response, next: NextFunction) =>{
		try{
			const {id,resignDate} = req.body
			await prisma.employee.update({
				where:{
					id:id
				},data:{
					endAt: resignDate
				}
			})
			res.status(200).json({msg:"Resign Employee successfully!!!"})
		}catch(err:any){
			res.status(500).json({msg: err.message});
		}
	},
	getEmployee : async (req: Request, res: Response, next: NextFunction) =>{
		try{
			const {id} = req.body
			const employee = await prisma.employee.findUnique({
				where: {
					id:id
				},include:{
					department:true
				}
			})
			res.status(200).json({employee: employee})
		}catch(err:any){
			res.status(500).json({msg: err.message})
		}
	},
	updateEmployee: async (req: Request, res: Response, next: NextFunction) =>{
		try{
			const {id} = req.body
			await prisma.employee.update({
				where: {
					id:id
				},data:{
					...req.body
				}
			})
		}catch(err:any){
			res.status(500).json({msg: err.message})
		}
	}
}

module.exports = employeeController