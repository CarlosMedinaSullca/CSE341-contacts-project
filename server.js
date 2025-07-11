/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require('express');
const mongodb = require('./data/database');
const app = express();
const contacts = require('./routes/contacts')


/* ***********************
 * Routes
 *************************/
app.use("/", require("./routes"));
app.use("/contacts", contacts);




/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/

const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Running on port ${port}`)});
    }
})

