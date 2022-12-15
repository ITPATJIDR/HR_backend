import {body} from "express-validator"

const schema = [
	body('username').exists({checkFalsy:true}),
	body('password').exists({checkFalsy:true}),	
]

export {schema as loginSchema}