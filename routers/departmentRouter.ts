import { departmentSchema } from "../middleware/validate/schema/createDepartment-schema";
import { addEmployeeSchema } from "../middleware/validate/schema/addEmployee-schema"
import {validateRequestSchema} from "../middleware/validate/validate-request"
const auth = require("../middleware/auth")
const departmentController = require("../controllers/departmentController")
const departmentRouter = require("express").Router();

departmentRouter.post("/createDepartment", departmentSchema, validateRequestSchema, departmentController.createDepartment)
departmentRouter.post("/addEmployee", addEmployeeSchema, validateRequestSchema, departmentController.addEmployee)
departmentRouter.get("/findEmployees", auth, departmentController.getAllEmployee)

module.exports = departmentRouter;