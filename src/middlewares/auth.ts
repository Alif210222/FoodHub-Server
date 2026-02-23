import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { prisma } from "../lib/prisma";
import { secret } from "../modules/User/user.service";

export enum UserRole {
  customer = "CUSTOMER",
  provider = "PROVIDER" ,
  admin = "ADMIN"
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("Token not found!!");
      }

      const decoded = jwt.verify(token, secret) as JwtPayload;

      console.log("From Auth DECODED: ",decoded);

      const userData = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!userData) {
        throw new Error("Unauthorized!");
      }

      if (userData.status !== "ACTIVE") {
        throw new Error("Unauthorized!!");
      }

      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("Forbidden !!!");
      }

      req.user = decoded;

      next();
      
    } catch (error: any) {
      next(error);
    }
  };
};

export default auth;