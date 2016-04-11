$(document).ready(function() {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal({
    dismissible: false
  });

  $('.datepicker').pickadate({
    selectYears: 100,
    selectMonths: true,
    monthsFull: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'],
    monthsShort: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
    weekdaysFull: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
    weekdaysShort: ['კვ', 'ორ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
    weekdaysLetter: ['კ', 'ო', 'ს', 'ო', 'ხ', 'პ', 'შ'],
    firstDay: 1,
    closeOnSelect: true,
    today: 'დღეს',
    clear: '',
    close: 'დახურვა',
    max: new Date(),
    format: 'yyyy-mm-dd'
  });

  $.get("skills", function(data) {
    var options = JSON.parse(data);
    var skills = $('#skills');
    for (var i in options) {
      var option = document.createElement("option");
      option.innerHTML = options[i];
      skills.append(option)
    }
    skills.material_select();
  });
});

var app = angular.module("site", []);
app.controller('controller', function($scope, $http) {
  $http.get("list").then(function(response) {
    $scope.persons = response.data;
    setTimeout(function() {
      $('.collapsible').collapsible({});
    }, 500);
  });
});

app.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

app.controller('addForm', ['$scope', function($scope) {
  $scope.submit = function() {
    var user = $scope.user;
    console.dir(user);
    var fd = new FormData();
    angular.forEach(user, function(value, key) {
      fd.append(key, value);
    });
    $.ajax({
      url: 'add',
      data: fd,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(response) {
        console.log(response)
      },
      error: function(error) {
        console.log(error)
      }
    });
    $scope.user = {}
  };

  $scope.cancel = function() {
    console.log("cancel");
    $scope.user = {}
  };
}]);
