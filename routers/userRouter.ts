import { registerSchema } from "../middleware/validate/schema/register-schema";
import { loginSchema } from "../middleware/validate/schema/login-schema"
import { validateReauestSchema } from "../middleware/validate/validate-request";
const auth = require("../middleware/auth")
const userRouter = require("express").Router();
const userController = require("../controllers/userController")

userRouter.post("/register",registerSchema,validateReauestSchema, userController.register);
userRouter.post("/login",loginSchema,validateReauestSchema, userController.login)
userRouter.get("/logout",userController.logout)
userRouter.get("/getUser",auth, userController.getUser)


module.exports = userRouter;