const express = require('express');
const dotenv = require('dotenv');
const apiRouter = require('./router/authRouter');
const adminRoutes = require("./router/adminRouter");
const cors = require('cors');
require('./connection/database');
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));                                
app.use(express.json());                          
app.use(express.urlencoded({ extended: true }));  

app.use('/api', apiRouter);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});