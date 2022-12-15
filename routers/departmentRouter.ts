const departmentController = require("../controllers/departmentController")
const departmentRouter = require("express").Router();

departmentRouter.post("/createDepartment",departmentController.createDepartment)
departmentRouter.post("/addEmployee",departmentController.addEmployee)
departmentRouter.get("/findEmployees",departmentController.getAllEmployee)

module.exports = departmentRouter;