import User from "../models/UserModel";
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
    return res.json({ user });
  } catch (error) {
    console.error("Error in Login controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signup = (req, resp) => {
  const { fullName, userName, password } = req.body;
  try {
    // Trying to find if the user exists
    const user = User.find({ userName: userName });
    if (user) {
      return resp.status(400).json({ error: "Username is already taken" });
    }

    // hash Password
    const salt = bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(password, salt);

    // creating and saving user
    const savedUser = new User({
      userName,
      password: hashPassword,
    });
    savedUser.save();
  } catch (error) {
    console.log("Error in SignUp controller" + error.message);
    return resp.status(500).json({ error: "Internal server error" });
  }
};
export const logout = (req, resp) => {};
