var app = angular.module("site", []);
app.controller('controller', function ($scope, $http, $filter) {

    var person = JSON.parse(localStorage.getItem("person"));
    localStorage.removeItem("person");
    console.log(person);
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

        $http.get("skills").then(function (response) {
            var options = response.data;
            var skills = $('#skills');
            for (var i in options) {
                var option = document.createElement("option");
                if ($scope.person.skills && ~$scope.person.skills.indexOf(options[i])) {
                    option.setAttribute("class", "active");
                }
                option.innerHTML = options[i];
                skills.append(option)
            }
            skills.material_select();
        });
    });
});

function submit() {
    var required = {
        'first_name': {
            message: 'სახელი აუცილებელი ველია'
        }, 'last_name': {
            message: 'გვარი აუცილებელი ველია'
        }
    };
    var ids = ['first_name', 'last_name', 'email', 'phone', 'birthday', 'address', 'education',
        'confessor', 'textarea'];
    var fd = new FormData();
    for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]).value;
        if (!el && required[ids[i]]) {
            Materialize.toast(required[ids[i]].message, 4000);
            return
        }
        if (el) {
            fd.append(ids[i], el);
        }
    }
    var files = document.getElementById('file').files;
    if (files.length > 0) {
        var file = files[0];
        fd.append('image', file);
    }

    var selected = document.getElementById('skills');
    var skills = getSelectValues(selected);
    fd.append('skills', skills);
    // var oReq = new XMLHttpRequest();
    // oReq.open("POST", "add", true);
    // oReq.send(fd);


    $.ajax({
        url: 'add',
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function () {
            location.replace('/')
        },
        error: function (error) {
            alert("დაფიქსირდა შეცდომა")
        }
    });
}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 1, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}