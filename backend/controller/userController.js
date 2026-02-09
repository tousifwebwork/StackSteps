
const Question = require('../models/questionDB');
const Progress = require('../models/progressDB');
const User = require('../models/authDB');
const Feedback = require('../models/feedbackModel');
const Bookmark = require('../models/bookmark');


const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;  // 24 hours in milliseconds
const MAX_IDLE_TIME_MS = 5 * 60 * 1000;            // 5 minutes max idle time


// Field mapping for progress tracking by technology
const FIELD_MAPS = {
    solved: {
        javascript: 'javascriptSolved',
        react: 'reactSolved',
        nodejs: 'nodejsSolved',
        mongodb: 'mongodbSolved',
        gitgithub: 'gitgithubSolved',
    },
    attempted: {
        javascript: 'javascriptAttempted',
        react: 'reactAttempted',
        nodejs: 'nodejsAttempted',
        mongodb: 'mongodbAttempted',
        gitgithub: 'gitgithubAttempted',
    },
    correct: {
        javascript: 'javascriptCorrect',
        react: 'reactCorrect',
        nodejs: 'nodejsCorrect',
        mongodb: 'mongodbCorrect',
        gitgithub: 'gitgithubCorrect',
    },
    incorrect: {
        javascript: 'javascriptIncorrect',
        react: 'reactIncorrect',
        nodejs: 'nodejsIncorrect',
        mongodb: 'mongodbIncorrect',
        gitgithub: 'gitgithubIncorrect',
    }
};

// Question Submission,@route POST /api/question
exports.submitAnswer = async (req, res) => {
    try {
        const { tech, questionNo, selectedOption } = req.body;
        const normalizedTech = tech.toLowerCase();

        // Find the question
        const question = await Question.findOne({
            tech: normalizedTech,
            questionNo: Number(questionNo),
        });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Check if answer is correct (case-insensitive comparison)
        const isCorrect = question.correctAnswer.trim().toLowerCase() === selectedOption.trim().toLowerCase();

        // Get or create user progress
        let progress = await Progress.findOne({ userId: req.user.id });
        const now = new Date();

        if (!progress) {
            progress = new Progress({
                userId: req.user.id,
                javascriptSolved: [],
                reactSolved: [],
                nodejsSolved: [],
                mongodbSolved: [],
                gitgithubSolved: [],
                attemptStartTime: now,
                todayAttempted: 0,
                timeSpentToday: 0,
                lastActiveTime: now,
            });
        }

        // Reset daily counters if 24 hours have passed
        if (!progress.attemptStartTime || (now - new Date(progress.attemptStartTime)) >= TWENTY_FOUR_HOURS_MS) {
            progress.attemptStartTime = now;
            progress.todayAttempted = 0;
            progress.timeSpentToday = 0;
            progress.lastActiveTime = now;
        }

        // Calculate time spent (cap at MAX_IDLE_TIME to avoid counting idle time)
        if (progress.lastActiveTime) {
            const timeSinceLastActive = now - new Date(progress.lastActiveTime);
            const timeToAdd = Math.min(timeSinceLastActive, MAX_IDLE_TIME_MS);
            progress.timeSpentToday = (progress.timeSpentToday || 0) + timeToAdd;
        }
        progress.lastActiveTime = now;

        // Update attempt counters
        progress.todayAttempted += 1;
        progress[FIELD_MAPS.attempted[normalizedTech]] = (progress[FIELD_MAPS.attempted[normalizedTech]] || 0) + 1;

        // Check if question was already solved
        const solvedArray = progress[FIELD_MAPS.solved[normalizedTech]] || [];
        const alreadySolved = solvedArray.includes(Number(questionNo));

        // Update correct/incorrect counters
        if (isCorrect) {
            progress[FIELD_MAPS.correct[normalizedTech]] = (progress[FIELD_MAPS.correct[normalizedTech]] || 0) + 1;

            // Add to solved array if not already solved
            if (!alreadySolved) {
                progress[FIELD_MAPS.solved[normalizedTech]] = [...solvedArray, Number(questionNo)];
            }
        } else {
            progress[FIELD_MAPS.incorrect[normalizedTech]] = (progress[FIELD_MAPS.incorrect[normalizedTech]] || 0) + 1;
        }

        await progress.save();

        // Return response
        return res.json({
            correct: isCorrect,
            message: isCorrect ? 'Correct answer' : 'Wrong answer',
            correctAnswer: question.correctAnswer,
            todayAttempted: progress.todayAttempted,
            alreadySolved: alreadySolved,
        });
    } catch (err) {
        console.error('Submit Answer Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get All Questions,@route GET /api/questions
exports.questions = async (req, res) => {
    try {
        const questions = await Question.find({});
        res.json({ questions });
    } catch (err) {
        console.error('Fetch Questions Error:', err);
        res.status(500).json({ error: err.message, message: 'Server error' });
    }
};

// Profile Management, @route GET /api/profile
exports.profile = async (req, res) => {
    try {
        const userInfo = await User.findById(req.user.id).select('-password');

        if (!userInfo) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(userInfo);
    } catch (err) {
        console.error('Get Profile Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile information, @route PUT /api/profile 
exports.Updateprofile = async (req, res) => {
    try {
        const { username, email, fullname } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username, fullname, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated',
            user: updatedUser,
        });
    } catch (err) {
        console.error('Update Profile Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Statistics & Progress,@route GET /api/getStats
exports.getStats = async (req, res) => {
    try {
        const progress = await Progress.findOne({ userId: req.user.id });

        // Return empty stats if no progress document exists
        if (!progress) {
            return res.json({
                javascript: { attempted: 0, correct: 0, incorrect: 0, solved: [] },
                react: { attempted: 0, correct: 0, incorrect: 0, solved: [] },
                nodejs: { attempted: 0, correct: 0, incorrect: 0, solved: [] },
                mongodb: { attempted: 0, correct: 0, incorrect: 0, solved: [] },
                gitgithub: { attempted: 0, correct: 0, incorrect: 0, solved: [] },
                todayAttempted: 0,
                timeSpentToday: 0,
            });
        }

        // Calculate daily stats with 24-hour reset
        const now = new Date();
        let todayAttemptedCount = 0;
        let timeRemaining = 0;
        let timeSpentToday = 0;

        if (progress.attemptStartTime) {
            const timePassed = now - new Date(progress.attemptStartTime);

            // Only include daily stats if within 24-hour window
            if (timePassed < TWENTY_FOUR_HOURS_MS) {
                todayAttemptedCount = progress.todayAttempted || 0;
                timeSpentToday = progress.timeSpentToday || 0;
                timeRemaining = TWENTY_FOUR_HOURS_MS - timePassed;
            }
        }

        // Return complete stats
        res.json({
            javascript: {
                attempted: progress.javascriptAttempted || 0,
                correct: progress.javascriptCorrect || 0,
                incorrect: progress.javascriptIncorrect || 0,
                solved: progress.javascriptSolved || [],
            },
            react: {
                attempted: progress.reactAttempted || 0,
                correct: progress.reactCorrect || 0,
                incorrect: progress.reactIncorrect || 0,
                solved: progress.reactSolved || [],
            },
            nodejs: {
                attempted: progress.nodejsAttempted || 0,
                correct: progress.nodejsCorrect || 0,
                incorrect: progress.nodejsIncorrect || 0,
                solved: progress.nodejsSolved || [],
            },
            mongodb: {
                attempted: progress.mongodbAttempted || 0,
                correct: progress.mongodbCorrect || 0,
                incorrect: progress.mongodbIncorrect || 0,
                solved: progress.mongodbSolved || [],
            },
            gitgithub: {
                attempted: progress.gitgithubAttempted || 0,
                correct: progress.gitgithubCorrect || 0,
                incorrect: progress.gitgithubIncorrect || 0,
                solved: progress.gitgithubSolved || [],
            },
            todayAttempted: todayAttemptedCount,
            timeSpentToday: timeSpentToday,
            timeRemaining: timeRemaining,
        });
    } catch (err) {
        console.error('Get Stats Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

//Update time spent on the platform today ,@route POST /api/updateTimeSpent
exports.updateTimeSpent = async (req, res) => {
    try {
        const { timeSpent } = req.body;
        const now = new Date();

        let progress = await Progress.findOne({ userId: req.user.id });

        if (!progress) {
            // Create new progress document
            progress = new Progress({
                userId: req.user.id,
                attemptStartTime: now,
                timeSpentToday: timeSpent || 0,
            });
        } else {
            // Reset if 24 hours have passed, otherwise update
            if (!progress.attemptStartTime || (now - new Date(progress.attemptStartTime)) >= TWENTY_FOUR_HOURS_MS) {
                progress.attemptStartTime = now;
                progress.timeSpentToday = timeSpent || 0;
                progress.todayAttempted = 0;
            } else {
                progress.timeSpentToday = timeSpent || 0;
            }
        }

        await progress.save();
        res.json({ success: true, timeSpentToday: progress.timeSpentToday });
    } catch (err) {
        console.error('Update Time Spent Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Feedback , @route POST /api/feedback
exports.submitFeedback = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newFeedback = await Feedback.create({ name, email, message });

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedback: newFeedback,
        });
    } catch (error) {
        console.error('Submit Feedback Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Bookmark Management ,@route POST /api/bookmark
exports.bookmark = async (req, res) => {
    try {
        const { subject, questionNo, questionText, options, correctAnswer } = req.body;

        // Check if already bookmarked
        const existingBookmark = await Bookmark.findOne({
            userId: req.user.id,
            subject: subject.toLowerCase(),
            questionNo: questionNo
        });

        if (existingBookmark) {
            return res.status(400).json({ message: 'Question already bookmarked' });
        }

        // Create new bookmark
        const newBookmark = await Bookmark.create({
            userId: req.user.id,
            subject: subject.toLowerCase(),
            questionNo,
            questionText,
            options,
            correctAnswer
        });

        res.status(201).json({
            message: 'Question bookmarked successfully',
            bookmark: newBookmark
        });
    } catch (err) {
        console.error('Bookmark Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


//@route GET /api/bookmarks
exports.getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.json({ bookmarks });
    } catch (err) {
        console.error('Get Bookmarks Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


//@route DELETE /api/bookmark/:bookmarkId
exports.removeBookmark = async (req, res) => {
    try {
        const { bookmarkId } = req.params;

        const bookmark = await Bookmark.findOneAndDelete({
            _id: bookmarkId,
            userId: req.user.id
        });

        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        res.json({ message: 'Bookmark removed successfully' });
    } catch (err) {
        console.error('Remove Bookmark Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Clear bookmarks (all or by subject) ,@route DELETE /api/bookmarks 
exports.clearBookmarks = async (req, res) => {
    try {
        const { subject } = req.query;

        // Build filter - always filter by user
        const filter = { userId: req.user.id };

        // Add subject filter if specified and not 'all'
        if (subject && subject !== 'all') {
            filter.subject = subject.toLowerCase();
        }

        await Bookmark.deleteMany(filter);
        res.json({ message: 'Bookmarks cleared successfully' });
    } catch (err) {
        console.error('Clear Bookmarks Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};