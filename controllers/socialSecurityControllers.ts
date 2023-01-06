import { Request, Response, NextFunction } from "express"
import prisma from "../util/database"

const socialSecurityControllers = {
	createSocialSecurityRate: async (req: Request, res: Response, next: NextFunction) => {
		try{
			const {employee,owner} = req.body	
			await prisma.socialSecurityRate.create({
				data:{
					employeeRate: employee,
					ownerRate: owner	
				}
			})

			res.status(200).json({msg:"Create Social Security Rate Success!!!"})
		}catch(err:any){
			res.status(500).json({msg: err.message});
		}
	},
	updateSocialSecurityRate :async (req: Request, res: Response, next: NextFunction) =>{
		try{
			const {id,employee,owner} = req.body	
			await prisma.socialSecurityRate.update({
				where:{
					id:id
				},
				data:{
					employeeRate: employee,
					ownerRate: owner	
				}
			})

			res.status(200).json({msg:"Create Social Security Rate Success!!!"})
		}catch(err:any){
			res.status(500).json({msg: err.message});
		}
	},
	getSocialSecurityRate: async (req: Request, res: Response, next: NextFunction) => {
		try{
			const socialSecurityRate = await prisma.socialSecurityRate.findFirst()
			res.status(200).json({socialSecurityRate: socialSecurityRate})
		}catch(err:any){
			res.status(500).json({msg: err.message});
		}
	}
}

module.exports = socialSecurityControllers