const express = require('express');
const dotenv = require('dotenv');
const apiRouter = require('./router/authRouter');
const cors = require('cors');
require('./connection/database');
dotenv.config();

const app = express();

app.use(cors());                                
app.use(express.json());                          
app.use(express.urlencoded({ extended: true }));  

app.use('/api', apiRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});