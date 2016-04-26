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

    $.get("skills", function (data) {
        var options = data;
        var skills = $('#skills');
        for (var i in options) {
            var option = document.createElement("option");
            option.innerHTML = options[i];
            skills.append(option)
        }
        skills.material_select();
    });
});

function submit() {
    var ids = ['first_name', 'last_name', 'email', 'phone', 'birthday', 'address', 'education',
        'confessor', 'textarea'];
    var fd = new FormData();
    for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]).value;
        console.log(el);
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

    $.ajax({
        url: 'add',
        data: fd,
        cache: false,
        processData: false,
        contentType:"multipart/form-data; charset:UTF-8",
        type: 'POST',
        success: function (response) {
            console.log(response)
        },
        error: function (error) {
            console.log(error)
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