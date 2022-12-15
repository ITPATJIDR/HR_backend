import sessionMiddleware from "../middleware/sessionMiddleware"
import passport from "../middleware/passportMiddleware"
const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

app.use("/user",require("../routers/userRouter"));

app.listen(PORT,() =>{
	console.log(`Server listening on port : ${PORT}`)
})

export default app; 