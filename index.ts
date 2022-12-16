import sessionMiddleware from "./middleware/sessionMiddleware"
import passport from "./middleware/passportMiddleware"
const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
dotenv.config()


// Middleware
app.use(cors())
app.use(express.json())
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

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