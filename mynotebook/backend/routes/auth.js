const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleWare/FetchUser');

// Secret key for JWT
const secretKey = 'gtavicecity@2010';

// Route 1: Create a User Using: POST "/api/auth/createUser". Doesn't Require authentication
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password with minimum length(5)").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If there are errors, return bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      // Encrypt password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      user = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Save user to database
      await user.save();
      
      // Return jsonwebtoken
      const TokenID = {
        user: {
          id: user.id
        }
      };

      const authToken = jwt.sign(TokenID, secretKey);
      res.json({ authToken });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route 2: Authentication required for logIn path api/auth/logIn
router.post(
  "/logIn",
  [
    body('email','Enter a valid email').isEmail(),
    body('password','Enter correct credentials').isLength({ min: 5 })
  ],
  async (req, res) => {
    // Check if there are any errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      // Return jsonwebtoken
      const authToken = jwt.sign(payload, secretKey);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route 3: Get loggedIn user details. LogIn is required
router.get("/getUser", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
