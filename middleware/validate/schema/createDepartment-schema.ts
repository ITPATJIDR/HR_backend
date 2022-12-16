import {body} from "express-validator"

const schema = [
	body('departmentName').exists({checkFalsy:true})
]

export {schema as departmentSchema}