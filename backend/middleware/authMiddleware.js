import jwt from 'jsonwebtoken';


 
  const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from "Bearer token"
    console.log("Received token:", token);
  
    if (!token) {
      return res.status(401).json({ message: 'No token found' });
    }
  
     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('Invalid token error:', err.message);
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = user;
      
     
      
      console.log('Decoded user:', req.user.user.id);
      next();
    });
  };
  

export default authMiddleware
