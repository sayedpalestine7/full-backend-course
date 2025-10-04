import experss from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prismaClient.js";

const router = experss.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Encrypt the password before storing it
  const hashedPassword = bcrypt.hashSync(password, 8);
  // save the new user and hased password to the database
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      }
    })

    // now that we have a user i want to create there first todo for them
    const defaultTodo = `Hello :) Add your fisrt todo!`;
    await prisma.todo.create({
      data: {
        text: defaultTodo,
        userId: user.id,
      }
    })

    // Create a token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.sendStatus(503);
  }
  // Removed duplicate response to prevent ERR_HTTP_HEADERS_SENT
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if(!user){
        return res.status(404).send({message: "User not found"});
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password); // returns true or false
    if(!passwordIsValid){
        return res.status(401).send({message: "Invalid password"});
    }
    console.log("User logged in:", user);

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    res.json({token});

  } catch (error) {
    cosnole.log(error.message);
    res.sendStatus(503);
  }
});

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
