import { upsertStreamUser } from '../lib/Stream.js';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: " all the fields are required!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email!" });
    }

    const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const newUser = await User.create({
      email,
      password,
      fullName,
      profilePic: randomAvatar
    });

    // Upsert user in Stream

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || ""
      })
      console.log(`stream user upserted successfully for ${newUser.fullName}`);
    } catch (error) {
      console.log(`Error upserting Stream user: ${error.message}`);
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('jwt', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Helps prevent CSRF attacks
    });

    return res.status(201).json({ message: "User created successfully!", success: true, user: newUser });
  } catch (error) {
    console.log(`Error in signup: ${error.message}`);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Inavlid Username or Password" });
    }
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Inavlid Username or Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.cookie('jwt', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Helps prevent CSRF attacks
    });
    res.status(200).json({ success: true, message: "Login successful!", user });
  } catch (error) {
    console.log("Error in login ", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}
export function logout(req, res) {
  res.clearCookie('jwt')
  res.status(200).json({ message: "Logout successful!", success: true });
}