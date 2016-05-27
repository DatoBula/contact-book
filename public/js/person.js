var app = angular.module("site", []);

app.controller('controller', function ($scope, $http) {

    var person = JSON.parse(localStorage.getItem("person"));
    localStorage.removeItem("person");
    $scope.person = person || {};
    angular.element(document).ready(function () {
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

    });

    $http.get("skills").then(function (response) {
        var options = response.data;
        var skills = $('#skills');
        for (var i in options) {
            var option = document.createElement("option");
            option.innerHTML = options[i];
            if ($scope.person.skills && $scope.person.skills.indexOf(options[i]) != -1) {
                option.setAttribute('selected', true);
            }
            skills.append(option)
        }
        skills.material_select();
        var ul = skills.prev();
        ul.children('li').toArray().forEach(function (li) {
            if ($scope.person.skills && $scope.person.skills.indexOf($(li).children('span')[0].innerText) != -1) {
                $(li).addClass('active selected');
                $($(li).children('span')[0]).children()[0].checked = true;
            }
        });
    });

    $scope.submit = function () {
        var required = {
            'first_name': {
                message: 'სახელი აუცილებელი ველია'
            }, 'last_name': {
                message: 'გვარი აუცილებელი ველია'
            }
        };

        $http.post('add', $scope.person).then(function (response) {
            window.location = '/';
        }, function (response) {
            Materialize.toast('დამატებისას მოხდა შეცდომა', 4000)
        });
    };


    $scope.uploadFile = function (evt) {
        var files = evt.target.files;
        var f = files[0];
        if (!f.type.match('image.*')) {
            return;
        }
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                $scope.person.image = e.target.result;
                document.getElementById('picture').src = e.target.result;
            };
        })(f);
        reader.readAsDataURL(f);
    };

    $scope.$watch('person.birthday', function () {
        $scope.birthday = new Date($scope.person.birthday);
    });

    $scope.$watch('birthday', function (newVal) {
        $scope.person.birthday = newVal.getTime();
    });

    document.getElementById('file').addEventListener('change', $scope.uploadFile, false);
});