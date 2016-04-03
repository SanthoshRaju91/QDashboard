var app = angular.module('upload', ['ngFileUpload']);

app.controller('uploadController', ['Upload', 'REST_URL', '$scope', '$parse', function(Upload, REST_URL, $scope, $parse) {
    
    $scope.submit = function(option) {                
        if(option == 'billability') {
            if($scope.file) {            
                $scope.uploadBillability(option, $scope.file);
            }    
        } else {
            console.log('Option not supported');
        }
    }
    
    $scope.submitFinancial = function(financeOption, verticalName, Nick, clientName, projectName) {        
        if(financeOption == 'Vertical') {
            if($scope.file && verticalName) {
                $scope.uploadVerticalFinance('financial', verticalName, Nick, $scope.file);                                    
            }   
        } else if(financeOption == 'Project') {
            if($scope.file && clientName && projectName) {
                $scope.uploadProjectFinance('financial', clientName ,projectName, $scope.file);          
            } 
        }
    }
    
    
    $scope.uploadVerticalFinance = function(option, verticalName, Nick, file) {         
        Upload.upload({
           url: REST_URL + '/upload',
            data: {option: option, financeOption: 'Vertical', verticalName: verticalName, file: file}
        }).then(function(response) {
            console.log(response);
            if(response.data.errorCode === 1) {
                $scope.error = true;
                $scope.message = 'Failed to upload';
            } else {
                socket.emit('notify', 'Data uploaded for Vertical: ' + verticalName );
                $scope.success = true;
                $scope.message = option.toUpperCase() + 'data uploaded successfully, backend started processsing the data file. Please check after a few seconds';
            }
        }, function(response) {
            $scope.error = true;
            $scope.message = 'Failed to upload';
        }, function(event) {
            var modelName = $parse('progress'+Nick);
            modelName.assign($scope, true);
            
            var modelPercentage = $parse('progress'+Nick+'Percentage');
            modelPercentage.assign($scope, parseInt(100.0 * event.loaded / event.total));            
                        
        });
    }
    
    
    $scope.uploadProjectFinance = function(option, clientName, projectName, file) {
        Upload.upload({
            url: REST_URL + '/upload',
            data: {option: option, clientName: clientName, projectName: projectName, file: file}
        }).then(function(response) {
            if(response.data.errorCode === 1) {
                $scope.error = true;
                $scope.message = 'Failed to upload';
            } else {
                $scope.success = true;
                $scope.message = option.toUpperCase() + 'data uploaded successfully, backend started processing the data file. Please check after a few seconds';
            }
        }, function(response) {
            $scope.error = true;
            $scope.message = 'Failed to upload';
        }, function(event) {
            $scope.progressProject = true;
            $scope.processProjPercentage = parseInt(100.0 * event.loaded / event.total);
        });
    }
    
        
    $scope.upload = function(option, file) {
        Upload.upload({
            url: REST_URL + '/upload/',
            data: {option: option, file: file}
        }).then(function(response) {
            console.log(response);
            if(response.data.errorCode === 1) {
               $scope.error = true;
               $scope.message = "Failed to upload";
           } else {               
               $scope.success = true;
               $scope.message = option.toUpperCase() + " data uploaded successfully, backend started processing the data file. Please check after a few seconds";
           }
        }, function(response) {
            $scope.error = true;
            $scope.message = "Failed to upload";            
        }, function(event) {            
            $scope.progressBill = true;
            $scope.progressBillPercentage = parseInt(100.0 * event.loaded / event.total);               
        });
    }
    
    $scope.clients = [
        {id: '1', name: 'Waste Management'},
        {id: '2', name: 'MMI'},
        {id: '3', name: 'CCE'},
        {id: '4', name: 'SAP'},
        {id: '5', name: 'MSI'}
    ];
    
    $scope.selectedClientName = "Select Client";
    
    $scope.selectedClient = function(clientid, clientname) {
        if(clientname) {
            $scope.selectedClientName = clientname
        }
    }
    
}]);

