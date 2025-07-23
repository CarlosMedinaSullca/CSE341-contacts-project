/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

const bodyParser = require('body-parser');



var corsOption = {
    origin: [ "https://project1-lyqc.onrender.com", "http://localhost:8080" ]
};

app.use(cors(corsOption));

// parse requests of content-type - application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    next();
}); 

/* ***********************
 * Routes
 *************************/
app.use("/", require("./routes"));




/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to the database!');
})
.catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

