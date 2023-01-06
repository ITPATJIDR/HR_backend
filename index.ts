import { Request,Response, NextFunction} from "express"
import sessionMiddleware from "./middleware/sessionMiddleware"
import passport from "./middleware/passportMiddleware"
const express = require('express')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
dotenv.config()


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(cookieparser())
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req: Request, res: Response, next: NextFunction) {
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Origin', req.headers.origin);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
if ('OPTIONS' == req.method) {
     res.send(200);
 } else {
     next();
 }
});

// Router
app.use("/user",require("./routers/userRouter"));
app.use("/employee",require("./routers/employeeRouter"));
app.use("/department",require("./routers/departmentRouter"));
app.use("/socialSecurityRate",require("./routers/socialSecurityRouter"));

// Server listening
app.listen(PORT,() =>{
	console.log(`Server listening on port : ${PORT}`)
})

export default app; 