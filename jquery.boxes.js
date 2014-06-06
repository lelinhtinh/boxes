/*!
 * jQuery Plugin boxes v0.3
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
                inputTxt: '',

                width: 'auto',
                height: 'auto',
                minWidth: 250,
                minHeight: 120,
                maxWidth: 800,
                maxHeight: 600,
                padding: [25, 20],
                border: [3, 3],

                autoClose: 0,
                noClose: false,
                clickOut: false,
                messString: true,
                autoResize: true,

                okBtnShow: false,
                cancelBtnShow: false,
                closeBtnShow: false,
                inputTxtShow: false,

                ok: function() {},
                cancel: function() {},
                close: function() {},
                input: function() {},
                button: function() {},
                helper: function() {},

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


            // Template cho boxes             
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
            // Hàm chuyển đổi stringHTML thành jQuery Object
            var template = function(name) {
                var item = eval('setting.temp.' + name);
                if (!item) {
                    item = eval('tpl.' + name);
                }
                return $(item);
            };
            // Cache các thành phần của boxes
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
            var helper = {

                /**
                 * Ex 1: helper.el.input.val();
                 * Ex 2: helper.el.overlay.css('background', 'green')
                 */
                el: {
                    boxes: $boxes,
                    overlay: $overlay,
                    inner: $inner,
                    title: $title,
                    close: $close,
                    content: $content,
                    mess: $mess,
                    input: $input,
                    button: $button,
                    ok: $ok,
                    cancel: $cancel
                },

                /**
                 * Tạo hiệu ứng dùng ảnh nền
                 * Ex 1: helper.effect('http://i.imgur.com/m3NXDa6.gif');
                 * Ex 2: helper.effect('load');
                 * @param {String} URL or 'load' or 'error'
                 */
                effect: function(url) {
                    if (url == 'load') {
                        url = 'data:image/gif;base64,R0lGODlhIAAgAPMAACIiIv///1JSUouLi2BgYHh4eM/Pz7Ozs0JCQjg4OFtbW+Tk5Pr6+gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==';
                    } else if (url == 'error') {
                        url = 'data:image/png;base64,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';
                    }
                    $overlay.css('background-image', 'url(' + url + ')');
                    $inner.css({
                        opacity: 0,
                        top: '-100%'
                    });
                },

                /**
                 * Xóa hiệu ứng
                 * Ex: helper.removeEffect();
                 */
                removeEffect: function() {
                    if ($inner.css('opacity') == 0) {
                        $overlay.css('background-image', 'none');
                        $inner.css('top', '-' + $inner.height());
                        $inner.animate({
                            opacity: 1,
                            top: '50%'
                        });
                    }
                },

                /**
                 * Kích thước hiện tại của boxes
                 * Ex 1: helper.curWidth;
                 * Ex 2: helper.curHeight;
                 */
                curWidth: 0,
                curHeight: 0,

                /**
                 * Căn chỉnh boxes vào giữa
                 * Ex 1: helper.center();
                 * Ex 2: helper.center(300, 500);
                 * @param1 {String}
                 */
                center: function(setHeight, setWidth) {
                    // Điều chỉnh chiều rộng
                    if (!setWidth) {
                        setWidth = setting.width;
                    }
                    $inner.width(setWidth);
                    var xWidth = $inner.width();
                    $inner.css({
                        width: xWidth,
                        height: 'auto',
                        'margin-left': '-' + (xWidth / 2) + 'px'
                    });
                    var boxWidth;
                    var winWidth = $(window).width();
                    var maxWidth = setting.maxWidth;
                    if (maxWidth > winWidth) {
                        maxWidth = winWidth;
                    }
                    if (xWidth > maxWidth) {
                        boxWidth = maxWidth;
                    } else {
                        boxWidth = xWidth;
                    }
                    var minWidth = setting.minWidth;
                    if (boxWidth < minWidth) {
                        boxWidth = minWidth;
                    }
                    $inner.css({
                        width: boxWidth,
                        'margin-left': '-' + (boxWidth / 2 + border[1]) + 'px'
                    });
                    if ($mess) {
                        $mess.height('auto');
                    }
                    helper.curWidth = boxWidth; // Lưu giá trị chiều rộng

                    // Điều chỉnh chiều cao
                    if (!setHeight) {
                        setHeight = setting.height;
                    }
                    $inner.height(setHeight);
                    var Btn = 0;
                    if ($button) {
                        Btn = $button.height();
                    }
                    var xHeight = $inner.height() + Btn;
                    $inner.css({
                        height: xHeight,
                        'margin-top': '-' + (xHeight / 2) + 'px'
                    });
                    var boxHeight;
                    var winHeight = $(window).height();
                    var maxHeight = setting.maxHeight;
                    if (maxHeight > winHeight) {
                        maxHeight = winHeight;
                    }
                    if (xHeight > maxHeight) {
                        boxHeight = maxHeight;
                    } else {
                        boxHeight = xHeight;
                    }
                    var minHeight = setting.minHeight;
                    if (boxHeight < minHeight) {
                        boxHeight = minHeight;
                    }
                    $inner.css({
                        height: boxHeight,
                        'margin-top': '-' + (boxHeight / 2 + border[0]) + 'px'
                    });
                    helper.curHeight = boxHeight; // Lưu giá trị chiều cao

                    // Điều chỉnh chiều cao phần nội dung
                    if ($mess) {
                        var buttonHeight = 0;
                        if ($button) {
                            buttonHeight = $button.outerHeight();
                        }
                        var titleHeight = 0;
                        if ($title) {
                            titleHeight = $title.outerHeight();
                        }
                        var inputHeight = 0;
                        if ($input) {
                            inputHeight = $input.outerHeight(true);
                        }
                        var newHeight = boxHeight - (titleHeight + inputHeight + buttonHeight + padding[0] * 2);
                        if (newHeight < 0) {
                            helper.effect('error');
                        } else {
                            $mess.height(newHeight);
                            helper.removeEffect();
                        }
                    }

                },

                /**
                 * Xóa boxes
                 * Ex: helper.close();
                 */
                close: function() {
                    if ($boxes) {
                        $inner.animate({
                            opacity: 0,
                            top: '-' + $inner.height()
                        }, 300, function() {
                            $boxes.remove();
                            helper.setHeight = helper.setWidth = helper.curHeight = helper.curWidth = 0;
                        });
                    }
                }
            };

            // Lưu biến thường dùng
            var mode = setting.mode,
                title = setting.title,
                message = setting.message,
                inputTxt = setting.inputTxt,
                padding = setting.padding,
                border = setting.border;


            var showBoxes = function() {

                // Hiển thị một số message đặc biệt
                if (message === null) {
                    message = 'null';
                } else if ($.type(message) == 'object') {
                    message = '[object Object]';
                }

                // Chuyển HTML thành String
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

                // Ok click
                if($ok) $ok.click(function() {
                    setting.ok.call($ok, helper, setting);
                    setting.button(true, helper, setting);
                    if (!setting.noClose) helper.close();
                });

                // Cancel click
                if($cancel) $cancel.click(function() {
                    setting.cancel.call($cancel, helper, setting);
                    setting.button(false, helper, setting);
                    if (!setting.noClose) helper.close();
                });

                // Close click
                if($close) $close.click(function() {
                    helper.noClose = true;
                    setting.close.call($close, helper, setting);
                    helper.close();
                });

                // Input change
                if($input) $input.on('input', function() {
                    setting.input.call($input, helper, setting);
                });

                // Xóa boxes khi click ra ngoài
                if (setting.clickOut) {
                    $overlay.click(function() {
                        helper.close();
                    });
                }

                // Xóa boxes theo thời gian định sẵn > 500ms
                var timeOut = setting.autoClose,
                    autoClose,
                    hoverClose = function() {
                        autoClose = setTimeout(function() {
                            helper.close();
                        }, setting.autoClose);
                    };
                if (timeOut >= 500) {
                    hoverClose();
                    $inner.hover(function() {
                        clearTimeout(autoClose);
                    }, function() {
                        hoverClose();
                    });
                }

                // Thiết lập temp cho 3 dạng popup mặc định
                if (!setting.okBtnShow && !/^alert|confirm|prompt$/.test(mode)) {
                    $ok = '';
                }
                if (!setting.cancelBtnShow && !/^confirm|prompt$/.test(mode)) {
                    $cancel = '';
                }
                if (!$ok && !$cancel) {
                    $button = '';
                }
                if (!setting.inputTxtShow && mode != 'prompt') {
                    $input = '';
                }
                if (!setting.closeBtnShow && /^alert|confirm|prompt$/.test(mode)) {
                    $close = '';
                }


                // Thêm boxes vào trang web
                $boxes.appendTo('body');

                // Hiệu ứng loading
                helper.effect('load');

                if (mode) {
                    $boxes.addClass(mode);
                }
                $boxes.append($overlay);
                $boxes.append($inner);
                $inner.css('border-width', border[0] + 'px ' + border[1] + 'px');
                $inner.append($content);
                if (title) {
                    $content.append($title.html(title));
                }
                $content.append($mess.html(message));
                $content.css({
                    padding: padding[0] + 'px ' + padding[1] + 'px'
                });
                $close && $inner.append($close.html(setting.closeBtn));
                if ($input) {
                    $content.append($input);
                    if (inputTxt) {
                        $input.val(inputTxt)
                    }
                }
                if ($button) {
                    $inner.append($button);
                    $ok && $button.append($ok.html(setting.okBtn));
                    $cancel && $button.append($cancel.html(setting.cancelBtn));
                    $button.css({
                        padding: '0 ' + padding[1] + 'px'
                    });
                }

                // Xử lý kho message có chứa ảnh
                var img = $mess.find('img');
                var leg = img.length;

                var checkLoader = function() {

                    // Căn chỉnh boxes vào giữa
                    helper.center();

                    // Xóa hiệu ứng loading
                    helper.removeEffect();
                };

                if (leg) {

                    var count = 0;
                    img.each(function(index, el) {
                        if (this.complete) {
                            count++;
                            if (leg == count) {
                                checkLoader()
                            }
                        } else {
                            $(this).load(function() {
                                count++;
                                if (leg == count) {
                                    checkLoader()
                                }
                            }).error(function() {
                                count++;
                                if (leg == count) {
                                    $(this).replaceWith('<span style="color:red">[ Image not loading: ' + this.src + ' ]</span>');
                                    checkLoader();
                                }
                            });
                        }

                    });

                } else {
                    checkLoader();
                }



                // Điều chỉnh boxes khi cửa sổ thay đổi kích thước
                if (setting.autoResize) {
                    var reCenter = true;
                    $(window).on('resize', function() {
                        if (reCenter) {
                            setTimeout(function() {
                                helper.center(height, width);
                                reCenter = true;
                            }, 300);
                            reCenter = false;
                        }
                    });
                }

                // Focus input (nếu có)
                if ($input) {
                    var el = $input.get(0);
                    var elemLen = el.value.length;
                    el.selectionStart = 0;
                    el.selectionEnd = elemLen;
                    el.focus();
                }

            };


            if (this.selector === undefined) {
                showBoxes();
                // helper function
                setting.helper.call(document, helper, setting);
            } else {
                this.click(function(event) {
                    event.preventDefault();
                    showBoxes();
                    // helper function
                	setting.helper.call(this, helper, setting);
                });
            }
        },


        /**
         * 3 kiểu popup của trình duyệt
         * Hàm callback trả về kết quả lưu trong this.data
         * Kết quả tương ứng với nút Ok hoặc Cancel
         * alert   :     undefined
         * confirm :  true  hoặc  false
         * prompt  : value  hoặc  null
         */
        alert: function(mess, callback) {
            $.boxes({
                mode: 'alert',
                message: mess,
                ok: function() {
                    if ($.type(callback) === "function") {
                        callback.apply({
                            data: undefined
                        });
                    }
                }
            });
        },
        confirm: function(mess, callback) {
            $.boxes({
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
                inputTxt: txt,
                button: function(e, helper) {
                    if ($.type(callback) === "function") {
                        var data = null;
                        if (e) {
                            data = helper.el.input.val();
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
            var _this = this,
                _call = Array.prototype.slice.call(arguments, 1);
            if (this.selector === undefined) {
                methods[methodOrOptions].apply(_this, _call);
            } else {
                this.click(function(event) {
                    event.preventDefault();
                    methods[methodOrOptions].apply(_this, _call);
                });
            }
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.init.apply(this, arguments);
        } else {
            window.console && console.error('Method ' + methodOrOptions + ' does not exist on jQuery.boxes');
        }
    };

})(jQuery);
