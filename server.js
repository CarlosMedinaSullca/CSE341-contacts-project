/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require('express');
const cors = require('cors');
const mongodb = require('./models');
const app = express();
const db = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');



var corsOption = {
    origin: "http://localhost:8081"
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors(corsOption));

// parse requests of content-type - application/json
app.use(express.json());

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

