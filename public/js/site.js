$(document).ready(function () {

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

    $.get("skills", function (options) {
        var skills = $('#skills');
        for (var i in options) {
            var option = document.createElement("option");
            option.innerHTML = options[i];
            skills.append(option)
        }
        skills.material_select();
    });

    setTimeout(function () {
        $('.collapsible').collapsible({});
    }, 500);
});

var app = angular.module("site", []);
app.controller('controller', function ($scope, $http) {
    $http.get("list").then(function (response) {
        $scope.persons = response.data;
        setTimeout(function () {
            $('.collapsible').collapsible({});
        }, 500);
    });
});