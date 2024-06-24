import jwt from "jsonwebtoken";

const generateAndSetToken = (resp, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    }); // Setting token expiry as 15 days
    if (!token) {
      return resp.json({ Error: "Token could not be generated" });
    }
    resp.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict", // prevents cross-site request forgery attacks
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    });
    resp.json({ message: "Token generated and set successfully" });
  } catch (error) {
    resp.json({ Error: "An error occurred while generating the token" });
  }
};

export default generateAndSetToken;
