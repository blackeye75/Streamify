import User from '../models/User.model.js';

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

    } catch (error) {

    }
}
export function login(req, res) {
    res.send('Hello from auth routes!')
}
export function logout(req, res) {
    res.send('Hello from auth routes!')
}