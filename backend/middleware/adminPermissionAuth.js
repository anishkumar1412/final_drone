import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env[`${decoded.role.toUpperCase()}_SECRET`]);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user || !req.user.access.includes(requiredPermission)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};
