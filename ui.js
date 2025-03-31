// pc, mobile 구분
var isPc = (function () {
    var filter = "win16|win32|win64|mac";
    var isPc = true;

    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            return false;
        } else {
            return true;
        }
    }
});



$(function () {
    // window os
    var isWin = navigator.platform.toUpperCase().indexOf('WIN') >= 0;
    if (isWin) { $("body").addClass('windows'); }
    // mac os
    var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (isMac) { $("body").addClass('mac'); }

    //gnb
    var gnb = {
        init: function () {
            this.headerScroll();
        },            
        headerScroll: function () {
            var prevScrollTop = 0;
            $(window).on('scroll', function () {
                var nextScrollTop = $(this).scrollTop();
                //scrollUp
                if (nextScrollTop <= prevScrollTop) {
                    $('#headerWrap').removeClass('scroll-down');
                    if (nextScrollTop < 60) {
                        $('#headerWrap').removeClass('trans');
                    } else {
                        $('#headerWrap').addClass('trans');
                    }
                } else {  //scrollDown
                    $('#headerWrap').addClass('scroll-down');
                }

                //scrollUp css
                if ($('#headerWrap').hasClass('scroll-down')) {
                    $('#headerWrap').css('top', '-60px');
                } else {  //scrollDown
                    $('#headerWrap').css('top', '0');
                }
                prevScrollTop = nextScrollTop;
            });
        }
    }
    gnb.init();


    var windW;
    $(window).on('resize', function () {
        windW = $(window).width();
        //heroWrap
        var _bgSelector = $('.visual-wrap');
        if (_bgSelector.length > 0) {
            var _bannerBg = _bgSelector.data('bg');
            _bgSelector.css({ "background-image": "url(" + _bannerBg + ")" });
        }
    }).resize();




    //quick button toggle class
    $(window).on('scroll', function () {
        var _offsetTop = $(this).scrollTop();
        if (_offsetTop > 200) {
            $('#quickWrap').addClass('on');
        } else {
            $('#quickWrap').removeClass('on');
        }
    });
    //quick button - go top
    $("#quickWrap .top-btn").on('click', function () {
        $('html, body').animate({ scrollTop:(0) }, 1000);
    });

});


// qucik button - scroll bottom css setting
function quickBtn() {
    $(window).on('scroll', function () {
        var _offsetTop = $(window).scrollTop();
        var _footerH = $('#footerWrap').outerHeight();
        var _footerOffset = ($(document).height() - $(window).height()) - _footerH + 200;
        if (_offsetTop >= _footerOffset) {
            $('#quickWrap').css('bottom', _footerH);
        } else {
            $('#quickWrap').css('bottom', 0);
        }
    });
};
quickBtn();