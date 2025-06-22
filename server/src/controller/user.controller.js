import User from "../models/User.model.js";

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, // Exclude current user
                { $id: { $nin: currentUser.friends } }, // Exclude friends of current user
                { isOnboarded: true }, // Only onboarded users
            ]
        })
        res.status(200).json(recommendedUsers)
    } catch (error) {
        console.error("Error fetching getrecommended contrlr ", error.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}
export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
    } catch (error) {
        console.error("Error fetching getMyFriends contrlr ", error.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}