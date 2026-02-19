const express = require('express');
const dotenv = require('dotenv');
const apiRouter = require('./router/authRouter');
const adminRoutes = require("./router/adminRouter");
const cors = require('cors');
const { sanitizeMiddleware } = require('./middleware/sanitize/sanitize');
require('./connection/database');
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));                                
app.use(express.json());                          
app.use(express.urlencoded({ extended: true }));  

// Sanitize all incoming user input to prevent XSS attacks
// This middleware sanitizes req.body, req.query, and req.params
app.use(sanitizeMiddleware);

app.use('/api', apiRouter);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});