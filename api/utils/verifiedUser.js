import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const validtoken = req.cookies?.token;
    if (!validtoken) return next(errorHandler(401, "you have to login"));
  
    jwt.verify(validtoken, process.env.JWT_SECRET,  (err, user)=> {
            if (err) {
                return res.status(403).json({
                    message: "Token verification failed",
                    error: true,
                    success: false
                });
            }
  
      req.user = user;
      next();
    });
  };
  
