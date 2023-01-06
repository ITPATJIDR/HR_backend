
import {body} from "express-validator"

const schema = [
	body('IDcard').exists({checkFalsy:true}),
	body('email').exists({checkFalsy:true}),
	body('firstName').exists({checkFalsy:true}),
	body('lastName').exists({checkFalsy:true}),
	body('age').exists({checkFalsy:true}),
	body('salaryBase').exists({checkFalsy:true}),
	body('phoneNumber').exists({checkFalsy:true}),
	body('emergencyPhone').exists({checkFalsy:true}),
	body('address').exists({checkFalsy:true}),
	body('departmentId').exists({checkFalsy:true}),
	body('relationship').exists({checkFalsy:true}),
	body('child').exists({checkFalsy:true}),
	body('employeeType').exists({checkFalsy:true}),
	body('bankName').exists({checkFalsy:true}),
	body('bankAccount').exists({checkFalsy:true}),
	body('typeofPay').exists({checkFalsy:true}),
]

export {schema as createEmployeeSchema}