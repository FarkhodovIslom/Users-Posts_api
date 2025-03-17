const express = require("express");
const dotenv = require("dotenv").config();
const router = require("./routes/router");
const ejs = require("ejs");
const path = require("path");

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use("/", router);


const PORT = process.env.PORT;
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
}); 

