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

const normalizeOrigin = (value) => value.replace(/\/$/, '');

const staticAllowedOrigins = [
  "http://localhost:5173",
  "https://tww-stackstep.netlify.app",
  "https://tww-chatty.netlify.app"
].map(normalizeOrigin);

const envAllowedOrigins = (process.env.FRONTEND_URL || "")
  .split(',')
  .map((origin) => origin.trim())
  .map(normalizeOrigin)
  .filter(Boolean);

const allowedOrigins = [...new Set([...staticAllowedOrigins, ...envAllowedOrigins])];

const corsOptions = {
  origin: function (origin, callback) {
    const normalizedOrigin = origin ? normalizeOrigin(origin) : origin;

    // Allow non-browser clients (e.g., curl/postman) and exact allowlisted origins.
    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());                          
app.use(express.urlencoded({ extended: true }));  
 
app.use(sanitizeMiddleware);

app.use('/api', apiRouter);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});