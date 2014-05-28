/*!
 * jQuery Plugin boxes v0.1
 *
 * by zzbaivong
 * http://devs.forumvi.com/
 */
(function($) {
    'use strict';
    var methods = {
        init: function(options) {
            var setting = $.extend({

                mode: '',
                title: '',
                message: '',
                okBtn: 'Xác nhận',
                cancelBtn: 'Hủy bỏ',
                closeBtn: 'Đóng',

                width: 'auto',
                height: 'auto',
                padding: [25, 20],
                margin: [0, 0],
                border: [3, 3],

                autoClose: 0,
                clickOut: false,
                messString: true,

                okBtnShow: false,
                cancelBtnShow: false,
                closeBtnShow: false,

                ok: function() {},
                cancel: function() {},
                close: function() {},
                button: function() {},

                temp: {
                    // boxes: '<div class="zzBoxes"></div>',
                    // overlay: '<div class="zzBoxes_overlay"></div>',
                    // inner: '<div class="zzBoxes_inner"></div>',
                    // title: '<h2 class="zzBoxes_title"></h2>',
                    // close: '<div class="zzBoxes_close"></div>',
                    // content: '<div class="zzBoxes_content"></div>',
                    // mess: '<div class="zzBoxes_mess"></div>',
                    // input: '<input class="zzBoxes_input" type="text" />',
                    // button: '<div class="zzBoxes_button"></div>',
                    // ok: '<div class="zzBoxes_ok"></div>',
                    // cancel: '<div class="zzBoxes_cancel"></div>'
                }
            }, options);

            var tpl = {
                boxes: '<div class="zzBoxes"></div>',
                overlay: '<div class="zzBoxes_overlay"></div>',
                inner: '<div class="zzBoxes_inner"></div>',
                title: '<h2 class="zzBoxes_title"></h2>',
                close: '<div class="zzBoxes_close"></div>',
                content: '<div class="zzBoxes_content"></div>',
                mess: '<div class="zzBoxes_mess"></div>',
                input: '<input class="zzBoxes_input" type="text" />',
                button: '<div class="zzBoxes_button"></div>',
                ok: '<div class="zzBoxes_ok"></div>',
                cancel: '<div class="zzBoxes_cancel"></div>'
            };

            var template = function(name) {
                var item = eval('setting.temp.' + name);
                if (!item) {
                    item = eval('tpl.' + name);
                }
                return $(item);
            };

            var $boxes = template('boxes'),
                $overlay = template('overlay'),
                $inner = template('inner'),
                $title = template('title'),
                $close = template('close'),
                $content = template('content'),
                $mess = template('mess'),
                $input = template('input'),
                $button = template('button'),
                $ok = template('ok'),
                $cancel = template('cancel');

            var mode = setting.mode,
                title = setting.title,
                message = setting.message,
                width = setting.width,
                height = setting.height,
                margin = setting.margin,
                padding = setting.padding,
                border = setting.border;

            if (message === null) {
                message = 'null';
            } else if ($.type(message) == 'object') {
                message = '[object Object]';
            }

            if (setting.messString) {
                message = message.toString().replace(/[<>\n\t]/g, function(m) {
                    return {
                        '<': '&lt;',
                        '>': '&gt;',
                        '\n': '<br />',
                        '\t': '<span style="display:inline-block;width:20px"></span>'
                    }[m]
                });
            }

            $ok.click(function() {
                setting.ok();
                $boxes.remove();
            });
            $cancel.click(function() {
                setting.cancel();
                $boxes.remove();
            });
            $close.click(function() {
                setting.close();
                $boxes.remove();
            });

            $ok.add($cancel).click(function() {
                setting.button($(this).is($ok), $input);
            });

            if (setting.clickOut) {
                $overlay.click(function() {
                    $boxes.remove();
                });
            }

            // Xóa boxes theo thời gian định sẵn
            var timeOut = setting.autoClose,
                autoClose,
                hoverClose = function() {
                    autoClose = setTimeout(function() {
                        $boxes.remove();
                    }, setting.autoClose);
                };

            if (timeOut >= 300) {
                hoverClose();
                $inner.hover(function() {
                    clearTimeout(autoClose);
                }, function() {
                    hoverClose();
                });
            }

            if (!setting.okBtnShow && !/^alert|confirm|prompt$/.test(mode)) {
                $ok = '';
            }

            if (!setting.cancelBtnShow && !/^confirm|prompt$/.test(mode)) {
                $cancel = '';
            }

            if (!$ok && !$cancel) {
                $button = '';
            }

            if (mode != 'prompt') {
                $input = '';
            }

            if (!setting.closeBtnShow && /^alert|confirm|prompt$/.test(mode)) {
                $close = '';
            }

            $boxes.appendTo('body').css('opacity', 0);
            if (mode) {
                $boxes.addClass(mode);
            }

            $boxes.append($overlay);
            $boxes.append($inner);
            $inner.append($content);
            if (title) {
                $content.append($title.html(title));
            }
            if (message) {
                $content.append($mess.html(message));
            }
            $content.css({
                padding: padding[0] + 'px ' + padding[1] + 'px',
                margin: margin[0] + 'px ' + margin[1] + 'px',
            });

            $close && $inner.append($close);

            $input && $content.append($input);

            if ($button) {
                $inner.append($button);
                $ok && $button.append($ok.html(setting.okBtn));
                $cancel && $button.append($cancel.html(setting.cancelBtn));
                $button.css({
                    padding: '0 ' + padding[1] + 'px'
                });
            }

            var testSize = function(wh) {
                if ($.type(wh) != 'number' && wh.slice(-2) != 'px') {
                    return true;
                }
            };

            var getSize = function(wh, type) {
                var size;
                if (testSize(wh)) {
                    $inner[type](wh);
                    size = $inner[type]();
                } else {
                    size = wh;
                }
                return size;
            };


            width = getSize(width, 'width');
            height = getSize(height, 'height');

            $inner.css({
                height: height,
                width: width,
                'margin-top': '-' + (height / 2 + margin[0] + border[0]) + 'px',
                'margin-left': '-' + (width / 2 + margin[1] + border[1]) + 'px',
                'border-width': border[0] + 'px ' + border[1] + 'px'
            });

            $boxes.appendTo('body').animate({
                'opacity': 1
            });

            $input && $input.focus();
        },
        alert: function(mess) {
            return $.boxes({
                mode: 'alert',
                message: mess
            });
        },
        confirm: function(mess, callback) {
            return $.boxes({
                mode: 'confirm',
                message: mess,
                button: function(e) {
                    if ($.type(callback) === "function") {
                        callback.apply({
                            data: e
                        });
                    }
                }
            });
        },
        prompt: function(mess, txt, callback) {
            $.boxes({
                mode: 'prompt',
                message: mess,
                temp: {
                    input: '<input class="zzBoxes_input" type="text" value="' + txt + '" />'
                },
                button: function(e, i) {
                    if ($.type(callback) === "function") {
                        var data = null;
                        if (e) {
                            data = i.val();
                        }
                        callback.apply({
                            data: data
                        });
                    }
                }
            });
        }
    };

    $.fn.boxes = $.boxes = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.init.apply(this, arguments);
        } else {
            console.error('Method ' + methodOrOptions + ' does not exist on jQuery.boxes');
        }
    };

})(jQuery);
