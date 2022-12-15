import { Request, Response, NextFunction} from 'express'


const auth = (req: Request, res: Response, next: NextFunction) =>{
	if (req.isAuthenticated()){
		next()
	}else{
		return res.status(401).json({msg:"Please Login!!!"})
	}
}

module.exports = auth
