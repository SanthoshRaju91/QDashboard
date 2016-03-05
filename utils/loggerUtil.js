var log4js = require('log4js');
var fs = require('fs');
var loggerStream = '';
var config = require('../config.js');

if(fs.existsSync(config.loggerFileLocation)) {
    loggerStream = fs.createWriteStream(config.loggerFileLocation, {flags: 'a', mode: '0o666 '});
    console.log('In true ' + loggerStream.path);    
} else {
    loggerStream = fs.createWriteStream(config.loggerFileLocation); 
    console.log('In false ' + loggerStream.path);
}
 
log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'file', filename: loggerStream.path, category: 'appLog'}
    ]
});

exports.logger = log4js.getLogger('appLog');