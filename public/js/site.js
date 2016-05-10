if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

var personHTML =  '<li class="collection-item">\
    <div id="name" class="collapsible-header">\
    <i class="material-icons">perm_identity</i>{0}\
    <a href="#!" class="secondary-content"><i class="material-icons icon-yellow">grade</i><i class="material-icons">mode_edit</i><i class="material-icons">delete</i></a>\
</div>\
<div class="collapsible-body">\
    <div class="row">\
    <div id="image" class="s2 col">\
    <img src="{1}" width="80px" height="80px" class="align-right circle">\
    </div>\
    <div id="info1" class="s4 col">\
    <label>დაბადიბის თარიღი </label>{2}\
<br>\
<label>მეილი </label> {3}\
<br>\
<label>ტელეფონი </label> {4}\
<br>\
</div>\
<div id="info2" class="s6 col">\
    <label>განათლება </label>{5}\
    <br>\
    <label>მისამართი </label> {6}\
<br>\
<label>მოძღვარი </label> {7}\
<br>\
</div>\
</div>\
<div id="info" class="row">\
    <div id="info3" class="s10 offset-s2 col">\
    <label>facebook </label><a href="{8}">{8}</a>\
<br>\
<label>დამატებითი ინფორმაცია </label>{10}<br>\
<label>უნარები </label><br>{9}<br>\
</div>\
</div>\
</div>\
</li>';

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

    $.get("list", function (persons) {
        for (var i in persons) {
            var image = "img/user.png";
            if (persons[i].image) {
                image = "data:image/png;base64," + persons[i].image
            }
            var html = personHTML.format(persons[i].first_name + " " + persons[i].last_name, image,
                persons[i].birthdate || '', persons[i].email || '', persons[i].phone || '',
                persons[i].education|| '',persons[i].address|| '', persons[i].confessor|| '',
                persons[i].facebook || '', persons[i].skills || '', persons[i].textarea || '');
            $('#persons').append(html);
        }
    });

    setTimeout(function () {
        $('.collapsible').collapsible({});
    }, 500);
});