/*!
 * jQuery Plugin boxes v0.1
 * rePopup v0.1
 * Replace JavaScript Popup Boxes
 * by zzbaivong
 * http://devs.forumvi.com/
 */
(function($) {
    'use strict';
    window.alert = function(mess) {
        $.boxes('alert', mess);
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
