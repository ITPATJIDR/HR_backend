import { Request, Response, NextFunction} from 'express'
import passport from '../middleware/passportMiddleware'


const auth = (req: Request, res: Response, next: NextFunction) =>{
	if (req.isAuthenticated() && passport.authenticate("jwt",{session:false})){
		next()
	}else{
		return res.status(401).json({msg:"Please Login!!!"})
	}
}

module.exports = auth
