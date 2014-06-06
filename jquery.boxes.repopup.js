/*!
 * rePopup v0.2 for jQuery Plugin boxes
 * Replace JavaScript Popup Boxes
 * by zzbaivong
 * http://devs.forumvi.com/
 */
(function($) {
    'use strict';
    window.alert = function(mess, callback) {
        $.boxes('alert', mess, function() {
            if ($.type(callback) === "function") {
                callback.apply({
                    data: this.data
                });
            }
        });
    };
    window.confirm = function(mess, callback) {
        $.boxes('confirm', mess, function() {
            if ($.type(callback) === "function") {
                callback.apply({
                    data: this.data
                });
            }
        });
    };
    window.prompt = function(mess, txt, callback) {
        $.boxes('prompt', mess, txt, function() {
            if ($.type(callback) === "function") {
                callback.apply({
                    data: this.data
                });
            }
        });
    };
})(jQuery);
