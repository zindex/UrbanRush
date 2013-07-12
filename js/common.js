$(document).ready(function() {
//при клике на поле, прибавляем к ширине 500

$('.search_fake').click(function() {
    $('.search_input_container').show();
    $('.search_input').animate({right: "0", width: "160"}, 500);
    $('.search_fake').hide();
    $('.search_real').show();
    $('.search_input').focus();
});

//при клике не на поле, отнимаем от ширины 500
$(".search_input").blur(function() {
    if ($(".search_input").val() == '') {
        $(".search_input").animate({right: "0", width: "1"}, 500);
        $(".search_input_container").hide();
        $('.search_real').hide();
        $('.search_fake').show();

    }
});

    $('.b-input').each(function(){
        var defVal = $(this).attr('data-placeholder-text');
        if( $(this).val() == ''){
            $(this).val(defVal);
            $(this).addClass('blurred')
        }

        $(this).on({
            'focus': function(){
                if( $(this).val() == defVal){
                    $(this).val('');
                    $(this).removeClass('blurred')
                }
            },
            'blur': function(){
                if( $(this).val() == ''){
                    $(this).val(defVal);
                    $(this).addClass('blurred')
                }
            }
        })

    });
    InitBodyBg();
    InitIE();
});


function InitBodyBg(){
    if ($("body").height() < 2200) {
        var minus_height = (2200 - $("body").height()) / 2;
        $("body").css({"background-position": "center"}); //-" + minus_height + "px
    }
}

function InitIE(){
	if (($.browser.msie) && (/MSIE (5\.5|6|7).+Win/.test(navigator.userAgent))) {
        $('#nav li').hover(
            function(){
                $(this).addClass('hover')
            },
            function(){
                $(this).removeClass('hover')
            }
        );
        $('.catalog__block-pic .top').hover(
            function(){
                $(this).addClass('top-hover')
            },
            function(){
                $(this).removeClass('top-hover')
            }
        );
        $('#nav .underBlock .contentList .itm:last-child').addClass('last-child');
        if( $('.underBlock').eq(2).width() < 410){ $('.underBlock').eq(2).css('width','380px')}
	}
}


function size() {
    var w, h, hh;
    w = (window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth));
    h = (window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight));
    hh = h - 20;
    return {
        w: w,
        h: h,
        hh: hh
    };
}
function slideAction(x, y, time, delay, lenght, dd) {
    if (dd == true) {
        window.clearInterval(intr);
    }
    intr = window.setInterval(function() {
        //var rt = $(".Lister").attr("act");
        //if(rt == "play") {
        var number = $(".aS").attr("id");
        if (number == lenght) {
            var num2 = 1;
        } else {
            var num2 = number * 1 + 1;
        }
        listAction(number, x, y, delay, lenght, false)
    }, time);
}

function Lister(hm, x, y, time, delay) {



    for (var i = 0; i < hm.length; i++) {
        var n = i + 1;
        if (n == 1) {
            var eny = " aS";
            var navcl = "listerNavSelected"
        } else {
            var eny = "";
            var navcl = "navButton";
        }
        $(".Lister").append("<div class=\"slide" + eny + "\" id=\"" + n + "\" onClick=\"Lock(" + n + "," + x + "," + y + "," + time + "," + delay + "," + hm.length + ")\" style=\"left: -" + x * i + "px;width:" + x + "px;height:" + y + "px;\"><img src=\"" + hm[i][0] + "\" style=\"\" width=\"" + x + "\" /></div>");
        $(".ListerNav").append("<div class='" + navcl + "' id=\"n" + n + "\" onClick=\"ClickClack(" + n + "," + x + "," + y + "," + time + "," + delay + "," + hm.length + ")\">" + hm[i][1] + "</div>");
    }

    var size_navbutton = (x / hm.length);
    if ($.browser.msie || $.browser.mozilla) {
        var msel = 43;
        //alert(size_navbutton-msel);
    } else {
        var msel = 41;
    }
    $(".navButton").css({"width": size_navbutton-40}).width(size_navbutton-40);
    $(".listerNavSelected").css({"width": size_navbutton-msel}).width(size_navbutton-msel);

    $(".slide").click(function() {

    });
    $(".Lister").css({
        "height": y + "px",
        "width": x + "px",
        "margin": "0 auto"
    });
    $(".BLister").css({
        "height": y + "px"
    });
    $(".ListerNav").css({
        "width": x + "px",
        "margin": "0 auto"
    });





    slideAction(x, y, time, delay, hm.length);
}

function ClickClack(id, x, y, time, delay, lenght) {

    listAction(id, x, y, delay, lenght, true);
    //$(".Lister").attr("act","stop");
    //setTimeout(function() { $(".Lister").attr("act","play"); },5000);
    slideAction(x, y, time, delay, lenght, true);

}
function Lock(id, x, y, time, delay, lenght) {

    listAction(id, x, y, delay, lenght);
    //$(".Lister").attr("act","stop");
    //setTimeout(function() { $(".Lister").attr("act","play"); },5000);
    slideAction(x, y, time, delay, lenght, true);
}
function listAction(id, x, y, delay, lenght, click) {
    var next, vector, prew;
    if (click == true) {
        var old = $(".aS").attr("id");
        prew = old;
        next = id;
        if (id == old) {

        } else if (id > old) {
            vector = "left";

        } else if (id < old) {
            vector = "right";
        }
    } else {

        vector = "left";
        prew = id;
        if (prew == lenght) {
            next = 1;
        } else {
            next = prew * 1 + 1;
        }
    }
    if (vector == "left") {
        $(".aS").removeClass("aS");
        $(".Lister #" + next).addClass("aS");
        //alert($(".ListerNav #n"+next).attr("class"));

        $(".listerNavSelected").attr("class", "navButton");
        $(".ListerNav #n" + next).attr("class", "listerNavSelected");

        $(".Lister #" + next).css({
            "left": x + "px"
        });
        $(".Lister #" + prew).animate({
            "left": "-" + x + "px"
        }, {
            'duration': delay,
            'queue': false
        });
        $(".Lister #" + next).animate({
            "left": "0"
        }, {
            'duration': delay,
            'queue': false
        });

    } else if (vector == "right") {

        $(".aS").removeClass("aS");
        $(".Lister #" + next).addClass("aS");
        //alert($(".ListerNav #"+next).attr("class"));

        $(".listerNavSelected").attr("class", "navButton");
        $(".ListerNav #n" + next).attr("class", "listerNavSelected");

        $(".Lister #" + next).css({
            "right": x + "px"
        });
        $(".Lister #" + prew).animate({
            "left": x + "px"
        }, {
            'duration': delay,
            'queue': false
        });
        $(".Lister #" + next).animate({
            "left": "0"
        }, {
            'duration': delay,
            'queue': false
        });
    }
}
