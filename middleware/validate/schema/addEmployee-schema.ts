import {body} from "express-validator"

const schema = [
	body("departmentId").exists({checkFalsy:true})
]

export {schema as addEmployeeSchema}