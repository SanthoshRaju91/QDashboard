var express=require ('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var methodOverride =  require('method-override'); 
var jwt = require('express-jwt');
var multer = require('multer');
var path = require('path');
var excel = require('node-excel-export');
var config = require('./config.js');
var logger = require('./utils/loggerUtil.js').logger;

//creating application server
var app = express();

//connection to mongo db
mongoose.connect(config.dbConnectionURL, function(err){
    if(err) {
        logger.error("Error in connecting to Mongo DB " + err);
    } else {
        logger.info("Connected to Mongo DB successfully");
    }
});

//user controller for login
var userController = require('./controllers/userController.js');


//application configuration
app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Required-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//rendering the default HTML angular page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//for login 
app.post('/login', userController.login);

//for registration
app.post('/register', userController.register);

//authenticating the route
app.use('/api', jwt({secret: config.secretKey}), require('./routes/routes.js')), 

app.listen(config.port, function(err) {
    if(err) {       
        logger.error("Error in starting the port at " + config.port);
    } else {       
        logger.info("Server listening on port: " + config.port);
  } 
});


