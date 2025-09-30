import experss from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = experss.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Encrypt the password before storing it
  const hashedPassword = bcrypt.hashSync(password, 8);


  res.sendStatus(201);
});

router.post("/login", (req, res) => {});

// router.post("/register", (req, res) => {
//     const {username, password} = req.body;
//     if(!username || !password) {
//         return res.status(400).json({message: "Username and password are required"});
//     }
//     const hashedPassword = bcrypt.hashSync(password, 8);
//     try {
//         const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
//         const info = stmt.run(username, hashedPassword);
//         const user = {id: info.lastInsertRowid, username};
//         const token = jwt.sign(user
//         , "secretkey", {expiresIn: "1h"});
//         res.status(201).json({user, token});
//     } catch (err) {
//         if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
//             return res.status(409).json({message: "Username already exists"});
//         }
//         res.status(500).json({message: "Internal server error"});
//     }
// });

export default router;
