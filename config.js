module.exports = {
    'dbConnectionURL': 'mongodb://localhost/qdashboard',
    'secretKey': 'veryverysecret',
    'loggerFileLocation': 'logs/app.log',
    'port': process.env.PORT || 3000,
    'excelPath': '../excel/HC_Billing_Non_Billing.xlsx'
}