import { Request, Response, NextFunction } from "express"
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
const { PrismaClient } = require('@prisma/client')
import session from "express-session"

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) =>{
	return session({
		name: "session",
		cookie:{
			maxAge: 7 * 24 * 60 * 60 * 1000,
		},
		secret:process.env.SESSION_SECRET as string,
		resave:true,
		saveUninitialized: true,
		store: new PrismaSessionStore(
			new PrismaClient(),
				{
					checkPeriod: 2 * 60 * 1000,  //ms
					dbRecordIdIsSessionId: true,
					dbRecordIdFunction: undefined,
				}
			)
	})(req, res, next);
}

export default sessionMiddleware