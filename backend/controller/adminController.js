const QuestSchema = require("../models/questionDB");
const User = require("../models/authDB");
const Progress = require("../models/progressDB");

// Get all users with their progress stats
exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== "admin")
            return res.status(403).json({ message: "Admin only" });

        // Get all users (excluding admins)
        const users = await User.find({ role: 'user' }).select('-password').lean();
        
        // Get progress for all users
        const userIds = users.map(u => u._id);
        const progressData = await Progress.find({ userId: { $in: userIds } }).lean();
        
        // Map progress to users
        const usersWithProgress = users.map(user => {
            const progress = progressData.find(p => p.userId.toString() === user._id.toString()) || {};
            
            // Calculate totals
            const solved = (
                (progress.javascriptSolved?.length || 0) +
                (progress.reactSolved?.length || 0) +
                (progress.nodejsSolved?.length || 0) +
                (progress.mongodbSolved?.length || 0) +
                (progress.gitgithubSolved?.length || 0)
            );
            
            const attempted = (
                (progress.javascriptAttempted || 0) +
                (progress.reactAttempted || 0) +
                (progress.nodejsAttempted || 0) +
                (progress.mongodbAttempted || 0) +
                (progress.gitgithubAttempted || 0)
            );
            
            const correct = (
                (progress.javascriptCorrect || 0) +
                (progress.reactCorrect || 0) +
                (progress.nodejsCorrect || 0) +
                (progress.mongodbCorrect || 0) +
                (progress.gitgithubCorrect || 0)
            );
            
            const incorrect = (
                (progress.javascriptIncorrect || 0) +
                (progress.reactIncorrect || 0) +
                (progress.nodejsIncorrect || 0) +
                (progress.mongodbIncorrect || 0) +
                (progress.gitgithubIncorrect || 0)
            );
            
            return {
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                imgURL: user.imgURL,
                createdAt: user.createdAt,
                stats: { solved, attempted, correct, incorrect }
            };
        });
        
        res.json({ users: usersWithProgress, total: users.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

exports.addQuestion = async (req, res) => {
    try {
        if (req.user.role !== "admin")
            return res.status(403).json({ message: "Admin only" });

        const question = await QuestSchema.create(req.body);
         res.status(201).json(question);
    } catch (error) {
          console.error(error);
        res.status(500).json({ error: "Failed to add question" });
    }
}

exports.updateQuestion = async (req, res) => {
    try {
        if (req.user.role !== "admin")
            return res.status(403).json({ message: "Admin only" });
     const updated = await QuestSchema.findByIdAndUpdate(req.params.id,  { $set: req.body }, { new: true, runValidators: true });
     res.json(updated);
    }catch (error) {        
        res.status(500).json({ error: "Failed to update question" });
    }
}

exports.deleteQuestion = async (req, res) => {
    try {
        if (req.user.role !== "admin")
            return res.status(403).json({ message: "Admin only" });
     const deleted = await QuestSchema.findByIdAndDelete(req.params.id);
     res.json(deleted);
    }catch (error) {        
        res.status(500).json({ error: "Failed to delete question" });
    }
}