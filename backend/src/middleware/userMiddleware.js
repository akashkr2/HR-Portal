import jwt from "jsonwebtoken";
import User from "../models/empModel.js";

export const userProtect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.key).select("-_id -password");

    req.user = user;

    if (!user) {
      const err = new Error("Invalid Token");
      err.statusCode = 401;
      return next(err);
    }
    next();
  } catch (error) {
    console.log(error);
    const err = new Error("Invalid Token");
    err.statusCode = 401;
    return next(err);
  }
};
