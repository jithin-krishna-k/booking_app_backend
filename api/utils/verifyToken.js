import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

//vreify token only(authenticated)
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  //console.log(token)
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    //jwt.sign(userData)
    req.user = user;
    next();
  });
};

//user verify (authorized)
export const verifyUser = (req, res, next) => {
  verifyToken(req, res,next,() => {
    //jwt user.id===params.id
    //console.log("req.user.id:", req.user.id);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized! "));
    }
  });
};

//verify isAdmin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res,next, () => {
    //console.log("req.user:", req.user);
   //console.log("req.user.isAdmin:", req.user.isAdmin);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

