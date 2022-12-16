import { createEmployeeSchema } from "../middleware/validate/schema/createEmployee-schema";
import {validateRequestSchema} from "../middleware/validate/validate-request"
const auth = require("../middleware/auth")
const employeeController = require("../controllers/employeeController")
const employeeRouter = require("express").Router();

employeeRouter.post("/createEmployee",createEmployeeSchema, validateRequestSchema, employeeController.createEmployee)
employeeRouter.post("/resignEmployeeNow", employeeController.resignEmployeeNow)
employeeRouter.post("/resignEmployeeSetDate", employeeController.resignEmployeeSetDate)
employeeRouter.post("/getEmployee",auth, employeeController.getEmployee)
employeeRouter.post("/updateEmployee", employeeController.updateEmployee)


module.exports = employeeRouter;