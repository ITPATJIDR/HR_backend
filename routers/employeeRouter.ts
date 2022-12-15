const employeeController = require("../controllers/employeeController")
const employeeRouter = require("express").Router();

employeeRouter.post("/createEmployee", employeeController.createEmployee)
employeeRouter.post("/resignEmployeeNow", employeeController.resignEmployeeNow)
employeeRouter.post("/resignEmployeeSetDate", employeeController.resignEmployeeSetDate)
employeeRouter.post("/getEmployee", employeeController.getEmployee)
employeeRouter.post("/updateEmployee", employeeController.updateEmployee)


module.exports = employeeRouter;