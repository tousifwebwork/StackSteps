const QuestSchema = require("../models/questionDB");

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