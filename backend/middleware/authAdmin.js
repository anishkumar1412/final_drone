import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Superadmin Token:", decoded);

    if (decoded.email !== process.env.ADMIN_EMAIL || !decoded.isSuperAdmin || decoded.role !== "superadmin") {
      return res.status(403).json({ success: false, message: "Not Authorized: Invalid super admin" });
    }

    req.isSuperAdmin = true;
    req.user = decoded;
   
    next();

  } catch (error) {
    console.error("authAdmin error:", error);
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authAdmin;
