import { Request, Response, NextFunction } from "express";
import { Strategy as LocaleStrategy } from "passport-local";
import  prisma  from "../util/database"
import passport from "passport";
import bcrypt from "bcrypt";
const passportJWT = require("passport-jwt"),
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

var opts = {
  jwtFromRequest: null,
  secretOrKey: "",
  issuer: "",
  audience: "",
};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET as string;
opts.issuer = "ITPAT.jitrada.com";
opts.audience = "ITPAT.net";

passport.use(new LocaleStrategy({
	usernameField: "username",
	passwordField: "password",
}, async (username, password,done) => {
	const user = await prisma.user.findUnique({
		where:{
			username:username
		}
	})
	if (user && await passwordCompare(password,user!.password)){
		done(null,user)
	}else{
		done(null,false)
	}
}));

passport.use(
    new JWTStrategy(opts, async (jwtPayload: any, done: any) => {
      await prisma.user.findUnique({
        where: {
          id: jwtPayload.id,
        },
      });
    })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (req: Request, id: any, cb: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return cb(null, user);
  } catch (error) {
    cb(error);
  }
});

const passwordCompare = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword);
};

export default passport;
