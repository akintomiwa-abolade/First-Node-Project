const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(cors());        

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(helmet());

// express session middleware
app.use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// api routes
let adminApi = require('./routes/admin');

app.use('/api/v1', adminApi);

// set port
const port = process.env.PORT || 9005;

app.listen(port, function(){
    console.log(`Server started on port ${port}...`);
});
