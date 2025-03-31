// go to top
var winH2 = $(window).height() || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
$(document).on('click', '.btn-top', function (e) {
    e.preventDefault();
    $('body, html').animate({
        scrollTop: 0
    }, 450);
});


var getBrowser = (function () {
    var s = navigator.userAgent.toLowerCase();

    var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
        /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
        /(trident)(?:.*rv:([\w.]+))?/.exec(s) ||
        /(msie) ([\w.]+)/.exec(s) ||
        /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
        [];
    return { name: match[1] || "", version: match[2] || "0" };
}());

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



// input
$(document).ready(function () {
    var placeholderTarget = $('.input-box input[type="text"], .input-box input[type="password"]');

    placeholderTarget.on('focus', function () {
        $(this).siblings('label').fadeOut('fast');
        $(this).siblings('span.fade').fadeOut('fast');
    });


    placeholderTarget.on('focusout', function () {
        if ($(this).val() == '') {
            $(this).siblings('label').fadeIn('fast');
            $(this).siblings('span.fade').fadeIn('fast');
        }
    });


    if ($(".tablest .col").length > 0) {
        $(".tablest .col").each(function (index) {
            var _width = $(this).data('col');
            $(this).outerWidth(_width);
        });
    }
});


//roll
jQuery(function () {
    var rollover = {
        newimage: function (src) {
            return src.substring(0, src.search(/(\.[a-z]+)$/)) + '_on' + src.match(/(\.[a-z]+)$/)[0];
        },
        oldimage: function (src) {
            return src.replace(/_on\./, '.');
        },
        init: function () {
            $('.roll').hover(
                function () {
                    $(this).attr('src', rollover.newimage($(this).attr('src')));
                }, function () {
                    $(this).attr('src', rollover.oldimage($(this).attr('src')));
                });
        }
    };
    rollover.init();
});

function addComma(data_value) {
    return Number(data_value).toLocaleString('en').split(".")[0];
}
function removeComma(data_value) {
    if (typeof data_value == "undefined" || data_value == null || data_value == "") {
        return "";
    }
    var txtNumber = '' + data_value;
    var replaceNum = txtNumber.replace(/(,)/g, "")
    return parseInt(replaceNum);
}

function removeTag(str) {
    if (str != null && str != '') {
        str = str.replace(/<br\/>/ig, "\n");
        str = str.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    }
    return str;
}

var depth1, depth2;
$(function () {
    // window os
    var windW;
    var isWin = navigator.platform.toUpperCase().indexOf('WIN') >= 0;
    if (isWin) { $("body").addClass('windows'); }


    // checkbox
    $(document).on('change', '.checkbox-item > input', function () {

        var _name = $(this).attr('name');
        var _len = $(".checkbox-item input:checkbox[name=" + _name + "]").length - 1;
        var _innerLen = $(".checkbox-inner .checkbox-item input:checkbox[name=" + _name + "]").length - 1;
        if ($(this).closest('.checkbox-wrap').hasClass('has-inner')) {
            if (!$(this).parents().hasClass('checkbox-inner')) {
                if ($(this).is(":checked")) {
                    $(".checkbox-inner input:checkbox[name=" + _name + "]").prop("checked", true);
                } else {
                    $(".checkbox-inner input:checkbox[name=" + _name + "]").prop("checked", false);
                }
            } else {
                if ($(".checkbox-inner input:checkbox[name=" + _name + "]:checked").length >= _innerLen) {
                    $(".checkbox-wrap.has-inner > .checkbox-item > input:checkbox[name=" + _name + "]").prop("checked", true);
                } else {
                    $(".checkbox-wrap.has-inner > .checkbox-item > input:checkbox[name=" + _name + "]").prop("checked", false);
                }
            }
        }
        if ($(this).parent().hasClass('all')) {
            if ($(this).is(":checked")) {
                $(".checkbox-item input:checkbox[name=" + _name + "]").prop("checked", true);
            } else {
                $(".checkbox-item input:checkbox[name=" + _name + "]").prop("checked", false);
            }
        } else {
            if ($(this).is(":checked")) {
                if ($(".checkbox-item input:checkbox[name=" + _name + "]:checked").length == _len) {
                    $(".checkbox-item.all input:checkbox[name=" + _name + "]").prop("checked", true);
                }
            } else {
                $(".checkbox-item.all input:checkbox[name=" + _name + "]").prop("checked", false);
            }
        }
    });


    //gnb
    var gnb = {
        init: function () {
            this.isOver = false;
            this.isMobile = false;
            this.isActive = false;
            if (typeof depth1 != "undefined" && depth1 < 100 && depth1 != -1) this.isActive = true;
            if (this.isActive) {
                this.currentOneDepthNum = depth1 - 1;
                this.currentTwoDepthNum = depth2 - 1;
            } else {
                this.currentOneDepthNum = depth1;
            }
            this.setLayout();
            this.headerScroll();
        },
        setLayout: function () {
            var _self = this;
            $(window).on('resize', function (e) {
                $('#headerWrap').removeClass('active');
                if ($(window).width() < 1024) {
                    _self.isMobile = true;
                } else {
                    _self.isMobile = false;
                }
                _self.addEvent();
            });
            if (!_self.isMobile && _self.isActive) {
                this.activeFunc(this.currentOneDepthNum, this.currentTwoDepthNum);
            }
        },
        headerScroll: function () {
            var prevScrollTop = 0;
            $(window).on('scroll', function () {
                var nextScrollTop = $(this).scrollTop();
                //scrollUp
                if (nextScrollTop <= prevScrollTop) {
                    $('#headerWrap').removeClass('scroll-down');
                    if (nextScrollTop < 100) {
                        $('#headerWrap').removeClass('trans');
                        if (nextScrollTop = 0) {
                            $('#headerWrap').css('top', '0');
                        }
                    } else {
                        $('#headerWrap').addClass('trans');
                    }
                } else {  //scrollDown
                    $('#headerWrap').addClass('scroll-down');
                }

                //scrollUp
                if ($('#headerWrap').hasClass('scroll-down')) {
                    $('#headerWrap').css('top', '-100px');
                } else {  //scrollDown
                    $('#headerWrap').css('top', '0');
                }
                prevScrollTop = nextScrollTop;
            });
        },
        addEvent: function () {
            var _self = this;

            // pc gnb open
            $('#headerWrap .gnb-menu .depth-1 li').on('mouseover focusin', function () {
                if ($(window).width() > 1024) {
                    $('#headerWrap').addClass('gnb-open');
                }
            }).on('mouseleave focusout', function () {
                if ($(window).width() > 1024) {
                    $('#headerWrap').removeClass('gnb-open');
                }
            });

            //mobile gnb open
            $('.depth-1 > li').find('.depth_1_toggle').off().on('click', function (e) {
                if ($(window).width() < 1025) {
                    e.preventDefault();
                    $(this).parent().siblings().children('.depth_1_toggle').removeClass('active');
                    $(this).toggleClass('active');
                    $(this).siblings('.depth-2').stop().slideToggle().addClass('active');
                    $(this).parent('li').siblings().children().siblings('.depth-2').slideUp();
                }
            });

            // mobile gnb burger open
            $('.btn-burger').off().on('click', function () {
                if ($(window).width() < 1025) {
                    $('#headerWrap').toggleClass('on');
                    $('#headerWrap .logo').toggleClass('dark');
                    $('#headerWrap .gnb-menu').toggleClass('active');

                    if ($('#headerWrap').hasClass('on')) {
                        $('html, body').css({ 'overflow': 'hidden', 'height': '100vh' });
                    } else {
                        $('html, body').css({ 'overflow': 'auto', 'height': 'auto' });
                    }
                }
            });
            if (_self.isMobile) {
                $('.gnb-menu > .depth-1 > li').eq(depth1 - 1).children('a').addClass('active').siblings('ul').addClass('active').slideDown();
                $('.gnb-menu > .depth-1 > li').eq(depth1 - 1).siblings().children('a').removeClass('active').siblings('ul').removeClass('active').slideUp();
            }
        },
        activeFunc: function (_oneNum, _twoNum) {
            if (_oneNum != -1) {
                // mobile gnb menu depth1 active
                $('#headerWrap .gnb-menu > ul > li a').removeClass('active');
                // mobile gnb menu depth2 open
                $('#headerWrap .gnb-menu > ul > li').eq(_oneNum).find(' > a').addClass('active');
                $('#headerWrap .gnb-menu > ul > li').eq(_oneNum).find('> ul > li').eq(_twoNum).find(' > a').addClass('active');}
            else if (_oneNum == -1) {}

        },
    }
    gnb.init();

    $(window).on('resize', function () {
        windW = $(window).width();
        //heroWrap
        var _bgSelector = $('.visual-wrap');
        if (_bgSelector.length > 0) {
            var _bannerBg = _bgSelector.data('bg');
            _bgSelector.css({ "background-image": "url(" + _bannerBg + ")" });
        }
    }).resize();


    //tab
    $('.tab-wrap > ul > li a,.tab-wrap > ul > li button').on('click', function (e) {
        var _tabNum = $(this).parent().data('tab');
        if (typeof _tabNum != "undefined") {
            $(this).closest('.tab-wrap').find('li').removeClass('active');
            $(this).parent().addClass('active');
            $(this).closest('.tab-wrap').siblings().children('.tab-contents').each(function () {
                $(this).removeClass('active');
                if (_tabNum == $(this).data('tab')) {
                    $(this).addClass('active');
                }
            });
            e.preventDefault();
        }
    });

    //tab scroll
    $('.tab-wrap ul li.active').each(function () {
        var _ul = $(this).parent().outerWidth();
        if (windW < 769) {
            var _width = $(this).outerWidth();
            var _length = $('.tab-wrap ul li').length;
            var _idx = $(this).index();
            var _total = _width * _idx;
            $('.tab-wrap ul').scrollLeft(_total);
            if (_idx === 0) {
                $('.tab-wrap ul').scrollLeft(0);
            }
            if (_idx === _length - 1) {
                $('.tab-wrap ul').scrollLeft(_ul);
            }
        } else {
            $('.tab-wrap ul').scrollLeft(0);
        }
    });


    //window load
    $(document).ready(function () {
        $(window).on('scroll', function () {
            var _offsetTop = $(window).scrollTop();
            var _footerH = $('#footerWrap').outerHeight() + 16;
            var _footerOffset = ($(document).height() - $(window).height()) - _footerH;
         
        }).scroll();
        $('.contents').addClass('visible');

        imgRatio();
    });


    // 문의하기 btn
    $('.contact-box .btn.xl').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //footer dropdown
    $('#footerWrap .footer-wrap .footer-txt .select a').on('click', function (e) {
        e.preventDefault();
        $(this).next('ul').stop().slideToggle(300);
    });
    $('#footerWrap .footer-wrap .footer-txt > .select > ul > li > a').on('click', function () {
        $(this).closest('ul').stop().slideUp(300);
    })

    //product tab toggle
    $('.tab-wrap.type3 > ul > li a').on('click', function (e) {
        $(this).closest('.tab-wrap').find('li').removeClass('active');
        $(this).parent().addClass('active');
        $(this).closest('.tab-wrap').parent().siblings('.tab-contents-wrap').find('.tab-contents').removeClass('active');
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).addClass('active');
        e.preventDefault();
    });

    //accordion
    $('.accordion-item').removeClass('active');
    $('.accordion-item').on('click', function (e) {
        $(this).next('.accordion-con').stop().slideToggle(300);
        $(this).toggleClass('active');
    });

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
        $('html, body').animate({ scrollTop: (0) }, 1000);
    });

});

// qucik button - scroll bottom css setting
function quickBtn() {
    $(window).on('scroll', function () {
        var _offsetTop = $(window).scrollTop();
        var _footerH = $('#footerWrap').outerHeight();
        var _footerOffset = ($(document).height() - $(window).height()) - _footerH + 300;
        if (_offsetTop >= _footerOffset) {
            $('#quickWrap').css('bottom', _footerH);
        } else {
            $('#quickWrap').css('bottom', 0);
        }
    });
};
quickBtn();


// popup module
//popup Background block - open
function addBlock() {
    $('body').append('<div class="popup-block"></div>');
    $('body, html, #wrap').css({ 'overflow': 'hidden', 'height': 'auto' });
    $('body').on('scroll touchmove mousewheel', function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    $('.popup-block').fadeIn(300);
    $('.popup-block').on('click', function () {
        if ($('.popup-block').length > 0) {
            $('.popup-block').fadeOut(300).empty().remove();
            $('.layer-popup').fadeOut(300);
        }
        $('body, html, #wrap').css({ 'height': 'auto', 'overflow': 'auto' });
        $('body').off('scroll touchmove mousewheel');
    });
}
$(document).on('click', '.pop-close', function (e) {
    e.preventDefault();
    $('.popup-block').trigger('click');
});
//popup Background block - close
function deleteBlock() {
    $('.popup-block').fadeOut(300);
    $('.popup-block').detach();
    $('body, html, #wrap').css({ 'height': 'auto', 'overflow': 'auto' });
    $('body').off('scroll touchmove mousewheel');
}

//layer popup - open
function openPopup(id) {
    addBlock();
    var _target = $('#' + id);
    _target.fadeIn(300);
    _target.focus();
    _target.find('.pop-close').on('click', function () {
        closePopup(id);
    });
    $('.layer-popup .scroll-box').css({ 'overflow-y': 'scroll' });
}
//layer popup - close
function closePopup(id) {
    deleteBlock();
    $('#' + id).fadeOut(300);
}
// e: popup module


//textarea string count
function fnChkByte(obj, maxByte) {
    var str = obj.value;
    var str_len = str.length;

    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";


    for (var i = 0; i < str_len; i++) {
        one_char = str.charAt(i);
        if (escape(one_char).length > 4) {
            rbyte += 2;                                       
        } else {
            rbyte++;                                            
        }
        if (rbyte <= maxByte) {
            rlen = i + 1;                                         
        }
    }

    if (rbyte > maxByte) {
        alert("최대 글자수는 " + maxByte + "자 입니다.");
        str2 = str.substr(0, rlen);
        obj.value = str2;
        fnChkByte(obj, maxByte);
    } else {
        document.getElementById('byteInfo').innerText = rbyte;
    }
}