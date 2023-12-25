function clock() {
    var d = new Date();

    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();

    month = new Array("Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень");

    var N_D = new Date();
    var weekday = new Array(7);
    weekday[0] = "Нд";
    weekday[1] = "Пн";
    weekday[2] = "Вт";
    weekday[3] = "Ср";
    weekday[4] = "Чт";
    weekday[5] = "Пт";
    weekday[6] = "Сб";

    if (day <= 9) day = "0" + day;
    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;

    time = "<span>" + hours + "<span class='dot'>:</span>" + minutes + "</span>";
    date = "<span>" + day + " " + month[d.getMonth()] + " " + d.getFullYear() + "</span>";

    if (document.layers) {
        document.layers.doc_time.document.close();
    } else {
        document.getElementById("time").innerHTML = time;
        document.getElementById("date").innerHTML = date;
    }

    setTimeout("clock()", 1000);
}