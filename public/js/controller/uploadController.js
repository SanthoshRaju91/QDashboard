var app = angular.module('upload', ['ngFileUpload']);

app.controller('uploadController', ['Upload', 'REST_URL', '$scope', function(Upload, REST_URL, $scope) {
    
    $scope.submit = function(option) {                
        if($scope.file) {            
            $scope.upload(option, $scope.file);
        }
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
            if(option == 'billability') {
                $scope.progressBill = true;
                $scope.progressBillPercentage = parseInt(100.0 * event.loaded / event.total);    
            } if(option == 'financial') {
                $scope.progressFin = true;
                $scope.progressFinPercentage = parseInt(100.0 * event.loaded / event.total);    
            }            
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

