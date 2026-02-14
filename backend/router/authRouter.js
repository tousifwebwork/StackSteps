const express = require('express');
const Router = express.Router();

const { Signup, Login } = require('../controller/authController');
const {
    submitAnswer,
    questions,
    profile,
    Updateprofile,
    getStats,
    updateTimeSpent,
    submitFeedback,
    bookmark,
    getBookmarks,
    removeBookmark,
    clearBookmarks,
    cloudinaryConfig,
    validateToken,
    getQuote
} = require('../controller/userController');
const xyz = require('../middleware/image/cloudinary');

// Middleware Imports
const { SignupValidator, LoginValidator } = require('../middleware/validator/AuthValidator');
const { JWT_Verify } = require('../middleware/jwt/jwt');


// Authentication routes
Router.post('/register', SignupValidator, Signup);
Router.post('/login', LoginValidator, Login);

//feedback route
Router.post('/feedback', submitFeedback);


// Question routes
Router.get('/questions', JWT_Verify, questions);
Router.post('/question', JWT_Verify, submitAnswer);

// Stats routes
Router.get('/getStats', JWT_Verify, getStats);
Router.post('/updateTimeSpent', JWT_Verify, updateTimeSpent);

// Profile routes
Router.get('/profile', JWT_Verify, profile);
Router.put('/profile', JWT_Verify, Updateprofile);

// Bookmark routes
Router.post('/bookmark', JWT_Verify, bookmark);
Router.get('/bookmarks', JWT_Verify, getBookmarks);
Router.delete('/bookmark/:bookmarkId', JWT_Verify, removeBookmark);
Router.delete('/bookmarks', JWT_Verify, clearBookmarks);


//Cloudinary route
Router.post('/upload', JWT_Verify, xyz.single('image'),cloudinaryConfig);

// Token validation route
Router.get('/validate', JWT_Verify, validateToken);

// Quote route
Router.get('/quote', getQuote);

module.exports = Router;