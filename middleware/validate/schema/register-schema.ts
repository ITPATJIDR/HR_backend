import {body} from "express-validator"

const schema = [
	body('username').exists({checkFalsy:true}),
	body('password').isLength({min:6}),	
]

export {schema as registerSchema}