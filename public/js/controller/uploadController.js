var app = angular.module('upload', ['ngFileUpload']);

app.controller('uploadController', ['Upload', 'REST_URL', '$scope', function(Upload, REST_URL, $scope) {
    
    $scope.submit = function(option) {                
        console.log($scope.file);
        if($scope.file) {            
            $scope.upload(option, $scope.file);
        }
    }
    
    $scope.upload = function(option, file) {
        Upload.upload({
            url: REST_URL + '/upload',
            data: {file: file}
        }).then(function(response) {
           if(response.data.errorCode === 0) {
               $scope.error = true;
               $scope.message = "Failed to upload";
           } else {
               $scope.success = true;
               $scope.message = "Uploaded successfully, backend started processing the data file";
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
}]);

