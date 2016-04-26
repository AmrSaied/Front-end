jQuery(function ($) {
    $(".dropdown").hover(function () {
        var t = $(this), e = $('<select title="select your language" />');
        t.children("li").each(function (t) {
            e.append($("<option />").attr("value", t).html($(this).html()))
        }), t.replaceWith(e);
        var l = $('.dropdown, select[id^="converted_dropdown_"]').index(this), e = $("<select />").attr("id", "converted_dropdown_" + (l + 1))
    }), $("#winner_top").length > 0 && $("#winner_top").owlCarousel({
        navigation: !0,
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: !0,
        navigationText: !1,
        singleItem: !0
    }), $("#goal_slide").length > 0 && $("#goal_slide").owlCarousel({
        navigation: !0,
        slideSpeed: 500,
        paginationSpeed: 400,
        autoPlay: !0,
        pagination: !1,
        navigationText: !1,
        singleItem: !0
    });
    var talbe_sort = function (t) {
        $(t).find(".tablesorter").tablesorter({
            theme: "jui",
            showProcessing: !0,
            headerTemplate: "{content} {icon}",
            widgets: ["uitheme", "zebra", "filter", "scroller", "reflow", "columnSelector"],
            widgetOptions: {
                scroller_height: 150,
                scroller_upAfterSort: !0,
                scroller_jumpToHeader: !0,
                scroller_barWidth: null,
                filter_external: "input.search",
                filter_reset: ".reset",
                reflow2_className: "ui-table-reflow",
                reflow2_classIgnore: "ui-table-reflow-ignore",
                reflow2_headerAttrib: "data-name",
                reflow2_labelClass: "ui-table-cell-label",
                reflow2_labelTop: "ui-table-cell-label-top"
            }
        })
    };
    if ($("#parentVerticalTab").length > 0 && $("#parentVerticalTab").easyResponsiveTabs({
            type: "vertical",
            width: "auto",
            fit: !0,
            closed: "accordion",
            tabidentify: "hor_1",
            activate: function (t) {
                talbe_sort(".resp-tab-content-active")
            }
        }), $(".resp-tab-content-active").length ? talbe_sort(".resp-tab-content-active") : $(".resp-tabs-container hor_1").length ? talbe_sort($(".resp-tabs-container hor_1 > div").eq(0)) : null, $(".testi").length > 0) {
        var $testi = $(".testi").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: !0,
            arrows: !1,
            autoplaySpeed: 6e3
        }), $ft = "<p>" + $testi.find(".slick-slide").eq(0).children("p").html() + "</p>";
        $("#string_holder").html($ft), $testi.on("afterChange", function (t, e, l, a) {
            var n = "<p>" + $testi.find(".slick-slide").eq(l).children("p").html() + "</p>";
            $("#string_holder").stop(!0, !0).fadeOut(function () {
                $(this).html(n).stop(!0, !0).fadeIn()
            })
        })
    }
    $(".date_calendar").length > 0 && $(".date_calendar").datepicker(), $(".time_zone").length > 0 && $(".time_zone").timepicker(), $("select.defaults-select-action").length > 0 && $("select.defaults-select-action").selectBoxIt({
        downArrowIcon: "fa fa-angle-down",
        autoWidth: !1,
        maxWidth: !1
    });
    var steps = 5, sl_width = $("#slider-range-min").width(), grades = ["Very Poor", "Poor", "Good", "Better", "Excellent"];
    if ($("#slider-range-min").length > 0 && $("#slider-range-min").slider({
            range: "min",
            value: 1,
            min: 1,
            max: steps,
            slide: function (t, e) {
                $(e.handle).html("<i>" + e.value + " " + grades[e.value - 1] + "</i>"), $("#amount").val(e.value + " " + grades[e.value - 1])
            },
            create: function (t, e) {
                setTimeout(function () {
                    var e = $("#slider-range-min").slider("value");
                    $(".ui-slider-handle").html("<i>" + e + " " + grades[e - 1] + "</i>");
                    var l = 1;
                    for (i = 0; i <= 100; i += 100 / (steps - 1))$(t.target).append("<i class='top_num' style='left:" + parseInt(i) + "%'>" + l + "</i>"), l++;
                    $("#amount").val(e + " " + grades[e - 1])
                }, 10)
            }
        }), $("span.fa.fa-bars").on("click", function () {
            $(this).parent().next().slideToggle()
        }), $("div.toggle").length > 0 && $("div.toggle").toggles({on: !0}), $("#jstree1").length > 0 && $("#jstree1").jstree(), $(window).load(function () {
            $(".scroll_sec").length > 0 && $(".scroll_sec").mCustomScrollbar({
                snapAmount: 40,
                scrollButtons: {enable: !0},
                keyboard: {scrollAmount: 40},
                mouseWheel: {deltaFactor: 40},
                scrollInertia: 40
            }), $(".goal_list").length > 0 && $(".goal_list").mCustomScrollbar({
                snapAmount: 40,
                scrollButtons: {enable: !0},
                keyboard: {scrollAmount: 40},
                mouseWheel: {deltaFactor: 40},
                scrollInertia: 40
            }), $(".privacy_scroll").length > 0 && $(".privacy_scroll").mCustomScrollbar({
                snapAmount: 40,
                scrollButtons: {enable: !0},
                keyboard: {scrollAmount: 40},
                mouseWheel: {deltaFactor: 40},
                scrollInertia: 40,
                callbacks: {
                    onTotalScroll: function () {
                        $(".acck").removeAttr("disabled")
                    }
                }
            }), $(".scrollTo a").click(function (e) {
                e.preventDefault();
                var $this = $(this), rel = $this.attr("rel"), el = "content-y" === rel ? ".demo-y" : "content-x" === rel ? ".demo-x" : ".demo-yx", data = $this.data("scroll-to"), href = $this.attr("href").split(/#(.+)/)[1], to = data ? $(el).find(".mCSB_container").find(data) : ".demo-yx" === el ? eval("(" + href + ")") : href, output = $("#info > p code"), outputTXTdata = ".demo-yx" === el ? data : "'" + data + "'", outputTXThref = ".demo-yx" === el ? href : "'" + href + "'", outputTXT = data ? "$('" + el + "').find('.mCSB_container').find(" + outputTXTdata + ")" : outputTXThref;
                $(el).mCustomScrollbar("scrollTo", to), output.text("$('" + el + "').mCustomScrollbar('scrollTo'," + outputTXT + ");"), $(".acck").removeAttr("disabled")
            })
        }), $("#calendar_month").length > 0 && $("#calendar_month").fullCalendar({
            header: {
                left: "prev,next today",
                center: "title",
                right: "month,basicWeek,basicDay"
            },
            defaultDate: "2015-12-12",
            editable: !0,
            eventLimit: !0,
            events: [{title: "All Day Event", start: "2015-12-01"}, {
                title: "Long Event",
                start: "2015-12-07",
                end: "2015-12-10"
            }, {id: 999, title: "Repeating Event", start: "2015-12-09T16:00:00"}, {
                id: 999,
                title: "Repeating Event",
                start: "2015-12-16T16:00:00"
            }, {title: "Conference", start: "2015-12-11", end: "2015-12-13"}, {
                title: "Meeting",
                start: "2015-12-12T10:30:00",
                end: "2015-12-12T12:30:00"
            }, {title: "Lunch", start: "2015-12-12T12:00:00"}, {
                title: "Meeting",
                start: "2015-12-12T14:30:00"
            }, {title: "Happy Hour", start: "2015-12-12T17:30:00"}, {
                title: "Dinner",
                start: "2015-12-12T20:00:00"
            }, {title: "Birthday Party", start: "2015-12-13T07:00:00"}, {
                title: "Click for Google",
                url: "http://google.com/",
                start: "2015-12-28"
            }]
        }), $("#calendar_list").length > 0 && $("#calendar_list").fullCalendar({
            header: {
                left: "title",
                center: "",
                right: "today"
            },
            defaultDate: "2015-12-12",
            defaultView: "agendaDay",
            editable: !0,
            eventLimit: !0,
            events: [{title: "All Day Event", start: "2015-12-01"}, {
                title: "Long Event",
                start: "2015-12-07",
                end: "2015-12-10"
            }, {id: 999, title: "Repeating Event", start: "2015-12-09T16:00:00"}, {
                id: 999,
                title: "Repeating Event",
                start: "2015-12-16T16:00:00"
            }, {title: "Conference", start: "2015-12-11", end: "2015-12-13"}, {
                title: "Meeting",
                start: "2015-12-12T10:30:00",
                end: "2015-12-12T12:30:00"
            }, {title: "Lunch", start: "2015-12-12T12:00:00"}, {
                title: "Meeting",
                start: "2015-12-12T14:30:00"
            }, {title: "Happy Hour", start: "2015-12-12T17:30:00"}, {
                title: "Dinner",
                start: "2015-12-12T20:00:00"
            }, {title: "Birthday Party", start: "2015-12-13T07:00:00"}, {
                title: "Click for Google",
                url: "http://google.com/",
                start: "2015-12-28"
            }]
        }), $("#select-to").length)var select_faq = $("#select-to").selectize({
        onChange: function (t) {
            var e = select_faq.closest(".top").next();
            if (t && t.length) {
                var l = e.find("div[data-question=" + t + "]");
                l.stop(!0, !0).fadeIn(), e.children().not(l).stop(!0, !0).fadeOut()
            } else e.children().stop(!0, !0).fadeIn()
        }
    });
    if ($("#select-tip").length)var select_tp = $("#select-tip").selectize({
        onChange: function (t) {
            var e = select_tp.closest(".top").next();
            if (t && t.length) {
                var l = e.find("div[data-tip=" + t + "]");
                l.stop(!0, !0).fadeIn(), e.children().not(l).stop(!0, !0).fadeOut()
            } else e.children().stop(!0, !0).fadeIn()
        }
    })
});