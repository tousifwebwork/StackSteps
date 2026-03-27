const express = require('express');
const dotenv = require('dotenv');
const apiRouter = require('./router/authRouter');
const adminRoutes = require("./router/adminRouter");
require('./connection/database');
const cors = require('cors');
const { sanitizeMiddleware } = require('./middleware/sanitize/sanitize');
require('./connection/database');
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://tww-chatty.netlify.app",
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.options(/.*/, cors({
  origin: allowedOrigins,
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