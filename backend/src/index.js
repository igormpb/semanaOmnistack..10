const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

mongoose.connect('mongodb+srv://igor16:26637586@cluster0-kwiur.mongodb.net/test?retryWrites=true&w=majority',{
useNewUrlParser: true,
useUnifiedTopology: true,});

const app= express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(routes)


app.listen(2222);