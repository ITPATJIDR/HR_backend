import request from "supertest";
import app from "../app"

describe("POST /user/register",() =>{
	it("Register with Empty username and password", async () =>{
		const res = await request(app)
			.post("/user/register")
			.send({
				username:"",
				password:""
			})
			.expect(400)
	})

	it("Register with Empty password", async () =>{
		const res = await request(app)
			.post("/user/register")
			.send({
				username:"test",
				password:""
			})
			.expect(400)
	})

	it("Register with Empty username ", async () =>{
		const res = await request(app)
			.post("/user/register")
			.send({
				username:"",
				password:"123456"
			})
			.expect(400)
	})

	it("Register with password length 5", async () => {
		const res = await request(app)
			.post("/user/register")
			.send({
				username:"test",
				password:"12345"
			})
			.expect(400)
	})

	it("Register Successfully", async () => {
		const res = await request(app)
		.post("/user/register")
		.send({
			username:"test",
			password:"123456"
		})
		.expect(400)
	})
})

describe("POST /user/Login", () =>{
	it("Login with out username and password", async () =>{
		const res = await request(app)
			.post("/user/login")
			.send({
				username:"",
				password:""
			})
			.expect(400)
	})

	it("Login with out username ", async () =>{
		const res = await request(app)
			.post("/user/login")
			.send({
				username:"",
				password:"123456"
			})
			.expect(400)
	})
	it("Login with out password", async () =>{
		const res = await request(app)
			.post("/user/login")
			.send({
				username:"test",
				password:""
			})
			.expect(400)
	})

	it("Login Successfully", async () =>{
		const res = await request(app)
			.post("/user/login")
			.send({
				username:"test",
				password:"123456"
			})
			.expect(201)
	})
})
