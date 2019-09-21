const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; //Step 1

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect( uri, {  //step 2
    useNewUrlParser: true,
    useCreateIndex: true, useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establish successfull");
})

const excerciseRouter = require('./routes/excercises');
const userRouter = require('./routes/users.js');

app.use('/exercises', excerciseRouter);
app.use('/users', userRouter);

//Step 3

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html')); //relative path
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 
