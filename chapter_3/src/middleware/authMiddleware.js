import jwt, { decode } from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.id; //what is the decoded.id ? it is the id we set when we created the token in authRoutes.js
    next();
  });
}

export default authMiddleware;