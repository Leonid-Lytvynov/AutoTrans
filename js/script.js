$(document).ready(function () {

    var ua = detect.parse(navigator.userAgent);
    $("html").addClass(ua.device.type + " " + ua.device.family + " " + ua.os.family + " " + ua.browser.family)

    $(".menuBtn").on("click", function () {
        $(this).toggleClass("selected")
        if ($(".greettingsBl").length > 0) {
            $("body").toggleClass("hidden")
            $(".greettingsBl .menu").slideToggle().toggleClass("open")
        }
        if ($(".leftLk").length > 0) {
            $(".leftLk").toggleClass("open")
        }
    })

    if ($(".copyRef").length > 0) {
        new ClipboardJS('.copyRef');
    }

    if ($(".timeBl").length > 0) {
        clock();
    }

    if ($(".tabs").length > 0) {
        $(".tabs").map(function () {
            $(this).tabs();
        })
    }

    if ($(".selectricBl").length > 0) {
        $(".selectricBl").map(function () {
            $(this).selectric({
                onChange: function (element) {
                    $(element).change();
                }
            });
        })
    }

    if ($(".calcBl").length > 0) {

        $(".listCars .item").click(function () {
            $(".listCars .item").removeClass("open")
            var pic = $(this).attr("data-pic")
            var logo = $(this).attr("data-logo")
            var name1 = $(this).attr("data-name1")
            var name2 = $(this).attr("data-name2")
            var pr = $(this).attr("data-pr")
            var sum1 = $(this).attr("data-sum1")
            var sum2 = $(this).attr("data-sum2")
            var term = $(this).attr("data-term")
            var time = $(this).attr("data-time")
            $(this).addClass("open")
            $(".carBl .pictureBl .picture").css('background-image', 'url("' + pic + '")');
            $(".carBl .pictureBl .logoPic").css('background-image', 'url("' + logo + '")');
            $(".carInfo .nameLine .name1").text(name1)
            $(".carInfo .nameLine .name2").text(name2)
            $(".carInfo .prLine .pr").text(pr)
            $(".carInfo .listInfo li .sum .sum1").text(sum1)
            $(".carInfo .listInfo li .sum .sum2").text(sum2)
            $(".carInfo .listInfo li .term .val").text(term)
            $(".carInfo .listInfo li .time .val").text(time)
        })

        $(".listCars").find(".item:eq(0)").trigger("click");
        var countCars = $(".listCars .item").length
        var pos
        $(".car-prev").click(function () {
            $(".listCars .item").map(function () {
                if ($(this).hasClass("open")) {
                    pos = $(this).index()
                    return
                }
            })
            $(".listCars .item").eq(pos - 1).trigger("click");
        })
        $(".car-next").click(function () {
            $(".listCars .item").map(function () {
                if ($(this).hasClass("open")) {
                    pos = $(this).index()
                    return
                }
            })
            if (pos + 1 == countCars) {
                $(".listCars .item").eq(0).trigger("click");
            } else {
                $(".listCars .item").eq(pos + 1).trigger("click");
            }
        })
    }

    function round6(z) {
        if (curs > 1) z = (1 * z).toFixed(6);
        else z = (1 * z).toFixed(2);
        return 1 * z;
    }

    function calc() {
        period = jQuery('[name=Plan]:checked').data('per');
        if (period <= 0) period = jQuery('#add_Days').val();
        jQuery('#profit_total').html(round6(jQuery('#add_Sum').val() * jQuery('[name=Plan]:checked').data('perc') / 100 * period) + ' ' + curr);
    }

    function ps() {
        jQuery('#add_Sum').val(round6(jQuery('[name=Plan]:checked').data('min') / curs));
        jQuery('#add_Sum').attr('min', round6(jQuery('[name=Plan]:checked').data('min') / curs));
        jQuery('#add_Sum').attr('max', round6(jQuery('[name=Plan]:checked').data('max') / curs));

        jQuery('#depo_min').html(round6(jQuery('[name=Plan]:checked').data('min') / curs) + ' ' + curr);
        jQuery('#depo_max').html(round6(jQuery('[name=Plan]:checked').data('max') / curs) + ' ' + curr);

        jQuery('.curr').html(curr);

        calc();
    }

    var curs = jQuery('[name=PSys] option:selected').data('curs');
    var curr = jQuery('[name=PSys] option:selected').data('curr');

    jQuery(document).ready(function () {
        jQuery('#add_Sum').on('keyup change', function () {
            calc();
        });

        jQuery('[name=Plan]').on('change', function () {
            if (jQuery('[name=Plan]:checked').data('per') > 0) jQuery('#add_Days').attr('disabled', true);
            else jQuery('#add_Days').attr('disabled', false);
            ps();
        });

        jQuery('[name=Days]').on('keyup change', function () {
            if (jQuery('[name=Days]').val() > jQuery('[name=Days]').attr('max')) jQuery('[name=Days]').val(jQuery('[name=Days]').attr('max'));

            ps();
        });

        jQuery('[name=PSys]').on('change', function () {
            curs = jQuery('[name=PSys] option:selected').data('curs');
            curr = jQuery('[name=PSys] option:selected').data('curr');

            jQuery('#add_curr').val(curr).change().selectric('refresh');

            ps();
        });

        ps();
    })

    if ($(".sliderNews").length > 0) {
        sliderNewsInit()
    }

    if ($(".sliderReviews").length > 0) {
        sliderReviewsInit()
    }

    if ($(".filterBl").length > 0) {
        var dateFormat = "dd.mm.yy",
            from = $("#from")
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 1,
                    dateFormat: "dd.mm.yy"
                })
                .on("change", function () {
                    to.datepicker("option", "minDate", getDate(this));
                }),
            to = $("#to").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: "dd.mm.yy"
            })
                .on("change", function () {
                    from.datepicker("option", "maxDate", getDate(this));
                });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
    }

    openMod();


})

var sliderNewsInit = function () {
    var owl = $('.sliderNews');
    owl.owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        navText: ['<span class="iconBl car-prev icon-left_button"></span>', '<span class="iconBl car-prev icon-left_button"></span>'],
        responsive: {
            0: {
                items: 1,
                margin: 0,
            },
            480: {
                items: 2,
                margin: 15,
            },
            768: {
                items: 3,
                margin: 30,
            },
            1200: {
                items: 4,
                margin: 30,
            }
        }
    })
}

var sliderReviewsInit = function () {
    var owl = $('.sliderReviews');
    owl.owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        navText: ['<span class="iconBl car-prev icon-left_button"></span>', '<span class="iconBl car-prev icon-left_button"></span>'],
        responsive: {
            0: {
                items: 1,
            },
            992: {
                items: 2,
                margin: 30,
            }
        }
    })
}

// const test = document.querySelector('.selectric')
// const test2 = document.querySelector('.selectric-wrapper')

// test.addEventListener('click', () => {
//     test2.classList.add('selectric-open');
// })



