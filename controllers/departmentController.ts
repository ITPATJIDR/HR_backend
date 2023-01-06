import {Request, Response, NextFunction} from "express"
import  prisma  from "../util/database"

const departmentController = {
	createDepartment: async (req: Request, res: Response, next: NextFunction) => {
		try{
			const { departmentName } = req.body

			const checkDepartment = await prisma.department.findUnique({
				where: {departmentName: departmentName}
			}) 

			if (checkDepartment != null){
				res.status(400).json({msg:"This Department is already created"})
			}else{
				await prisma.department.create({
					data:{
						departmentName: departmentName
					}
				})
				res.status(200).json({msg:"create department successfully "})
			}

		}
		catch(err:any){
			res.status(500).json({msg:err.message})
		}
	},
	addEmployee: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {id,departmentId} = req.body
			await prisma.employee.update({
				where:{
					id:id
				},
				data:{
					departmentId:departmentId
				}
			})
			res.status(200).json({msg:"Add employee to department successfully"})

		} catch (err:any) {
			res.status(500).json({msg:err.message})	
		}
	},
	getAllEmployee: async (req: Request, res: Response, next: NextFunction) => {
		try{
			const {id} = req.body
			const employees = await prisma.department.findUnique({
				where: {
					id:id
				},include:{
					employees:true
				}
			})
			res.status(200).json({employees:employees})
		}catch (err:any) {
			res.status(500).json({msg:err.message})	
		}
	},
	getDepartments: async (req: Request, res: Response, next: NextFunction) => {
		try{
			const departments = await prisma.department.findMany({
				include:{
					employees:true
				}
			})
			res.status(200).json({departments: departments})
		}catch (err:any) {
			res.status(500).json({msg:err.message})	
		}

	},
}

module.exports = departmentController