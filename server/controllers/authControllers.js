import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { userName, password } = req.body;

  // Check if the form is filled
  if (!userName || !password) {
    return res
      .status(400)
      .json({ error: "Username or password is not filled" });
  }

  try {
    // Now verify the user
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Checking the password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }

    // Success: return user info or a token
    // You can include a token generation here if you use JWT or similar
    return res.json({
      id: user._id,
      fullName: user.fullName,
      userName: user.userName,
    });
  } catch (error) {
    console.error("Error in Login controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  const { fullName, userName, password } = req.body;
  try {
    // Trying to find if the user exists
    const user = await User.findOne({ userName: userName });
    if (user) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Creating and saving user
    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    // Return success response
    return res.status(201).json({
      id: savedUser._id,
      fullName: savedUser.fullName,
      userName: savedUser.userName,
    });
  } catch (error) {
    console.error("Error in SignUp controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, resp) => {};
