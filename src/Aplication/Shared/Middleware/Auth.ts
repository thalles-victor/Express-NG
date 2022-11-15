import { Request, Response, NextFunction } from "express";

import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../Utils/ENV"; 
import { IPayLoadProps } from "../Utils/IPayLoad";


export async function Auth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorizationRequest = request.headers.authorization;

  if (!authorizationRequest) {
    return response.status(400).json({
      statusCode: 400,
      message: "Token required"
    })
  }

  if (authorizationRequest.split(" ")[0] !== "Bearer") {
    return response.status(400).json({
      statusCode: 400,
      message: "badly formatted token"
    })
  }

  const token = authorizationRequest.split(" ")[1];
  
  if (!token) {
    return response.status(400).json({
      statusCode: 400,
      message: "Token cannot to be empty"
    })
  }

  let tokenIsValid: string | JwtPayload;

  try {
    tokenIsValid = verify(token, JWT_SECRET)
  } catch (error) {
    return response.status(401).json({
      statusCode: 401,
      message: "Invalid assinature"
    })
  }

  if (!tokenIsValid) {
    return response.status(401).json({
      statusCode: 401,
      message: "Unathorizated"
    })
  }

  const payload = tokenIsValid as IPayLoadProps;

  request.body.payload = payload;

  next();
}