import jwt from "jsonwebtoken";
import authAdmin from "./authAdmin.js";         // Should use Sequelize inside
import { verifyToken } from "./adminPermissionAuth.js"; // Should use Sequelize inside

const dynamicAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.role) {
      return res.status(401).json({ message: "Invalid token or missing role" });
    }

    console.log("Decoded token:", decoded);

    if (decoded.role === "superadmin" && decoded.isSuperAdmin) {
      return authAdmin(req, res, next); // Must use Sequelize internally
    }

    return verifyToken(req, res, next); // Must use Sequelize internally

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default dynamicAuthMiddleware;
