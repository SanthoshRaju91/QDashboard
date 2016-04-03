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

//creating real time application server
var app = express();
var http = require('http').Server(app);

//creating an io socket
var io = require('socket.io')(http);
io.on('connection', function(socket) {        
    logger.info('Socket connection established');
    
    io.sockets.emit('connected', 'Socket connection established');
    
    socket.on('notify', function(msg) {
       io.emit('notify', msg);
    });
});


//connection to mongo db
mongoose.connect(config.dbConnectionURL, function(err){
    if(err) {
        logger.error("Error in connecting to Mongo DB " + err);
    } else {
        logger.info("Connected to Mongo DB successfully");
    }
});

// User and parsing controllers
var userController = require('./controllers/userController.js');
var parseBillabilityData = require('./automated_task/parseBillabilityData.js');
var parseFinancialData = require('./automated_task/parseFinanceData.js');



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


// Configuring upload directory
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname.split(".")[0] + '_' + datetimestamp + '.' + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    }
});

var upload = multer({
    storage: storage
}).single('file');


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

app.post('/api/upload', function(req, res) {
        
    upload(req, res, function (err) {
        if (err) {
            console.log("Error : " + err);
            res.json({
                status: 500,
                success: false,
                errorCode: 1,
                desc: err
            });
        } else {
            if (req.body.option == 'billability') {
                console.log("Billability Data uploaded, data is being processed for insertion");
                parseBillabilityData.parseBillabilityData(req.file.filename);                
                res.json({
                    status: 200,
                    success: true,
                    errorCode: 0,
                    desc: 'Uploaded!'
                });
            } else if (req.body.option == 'financial') {
                if(req.body.financeOption == 'Vertical') {
                    parseFinancialData.parseFinancialDataForVertical(req.body.verticalName, req.file.filename);                     
                    res.json({
                        status: 200,
                        success: true,
                        errorCode: 0,
                        desc: 'Financial Data uploaded!'
                    });
                } else {
                    parseFinancialData.parseFinancialDataForProject('Project', req.body.clientName, req.body.projectName, req.file.filename);
                    res.json({
                       status: 200,
                        success: true,
                        errorCode: 0,
                        desc: 'Financial Data uploaded!'
                    });
                }
                
            }
        }
    });
});  
    
http.listen(config.port, function(err) {
    if(err) {       
        logger.error("Error in starting the port at " + config.port);
    } else {       
        logger.info("Server listening on port: " + config.port);
  } 
});


