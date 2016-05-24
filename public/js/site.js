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

    setTimeout(function () {
        $('.collapsible').collapsible({});

        $('.modal-trigger').leanModal({
            dismissible: false
        });
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

    $scope.deletePerson = function (person) {
        $http.post('delete', {id: person._id}).then(function (response) {
            var index = $scope.persons.indexOf(person);
            $scope.persons.splice(index, 1);
        }, function (response) {
            Materialize.toast('წაშლისას დაფიქსირდა შეცდომა!', 4000)
        });
    };

    $scope.editPerson = function (person) {
        localStorage.setItem("person", JSON.stringify(person));
        window.location = 'person.html';
    };

    $scope.addSkill = function () {
        var skill = $scope.skill;
        if (!skill || skill === '') {
            Materialize.toast('სახელი არ შეიძლება იყოს ცარიელი!', 4000)
        } else {
            $http.post('addSkill', {skill: skill}).then(function (response) {
                $('#addSkillModal').closeModal();
            }, function (response) {
                Materialize.toast('ფავორიტებში დამატებისას / წაშლისას მოხდა შეცდომა!', 4000)
            });
        }
    };

    $scope.toggleFavorite = function (person) {
        $http.post('favorite', {id: person._id, favorite: !person.favorite}).then(function (response) {
            person.favorite = !person.favorite;
        }, function (response) {
            Materialize.toast('ფავორიტებში დამატებისას / წაშლისას მოხდა შეცდომა!', 4000)
        });
    };
});