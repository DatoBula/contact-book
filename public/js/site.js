$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
    //$('select').material_select();

    setTimeout(function(){
        $('select').material_select();
    },1000);

    $('.datepicker').pickadate({
        selectYears: 100,
        selectMonths: true,
        monthsFull: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'],
        monthsShort: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
        weekdaysFull: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
        weekdaysShort: ['კვ', 'ორ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
        weekdaysLetter: [ 'კ', 'ო', 'ს', 'ო', 'ხ', 'პ', 'შ' ],
        firstDay: 1
    });
});

var app = angular.module("site", []);
app.controller('controller', function ($scope, $http) {
    $http.get("list").then(function (response) {
        $scope.persons = response.data;
        setTimeout(function(){
            $('.collapsible').collapsible({});
        },500);
    });

    $http.get("skills").then(function (response) {
        $scope.skills = response.data;
        setTimeout(function(){
            $('select').material_select();
        },500);
    });
});