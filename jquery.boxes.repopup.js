/*!
 * rePopup for jQuery Plugin boxes v0.2+
 * Replace JavaScript Popup Boxes
 * by lelinhtinh
 * http://devs.forumvi.com/
 */
(function($) {
    'use strict';

    /**
     * Wrap native alert/confirm/prompt with $.boxes while keeping support for the optional
     * callback signature used by the plugin. The wrapped functions now mirror the
     * synchronous browser behaviour instead of returning a Promise.
     */

    var resolveValue = function(context) {
        if (context && Object.prototype.hasOwnProperty.call(context, 'data')) {
            return context.data;
        }

        return undefined;
    };

    var wrap = function(method, cbIndex) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            var callback = args[cbIndex];
            var hasCallback = $.type(callback) === 'function';

            if (hasCallback) {
                args.splice(cbIndex, 1);
            } else {
                callback = null;
            }

            var resolvePromise = null;
            var promise = null;

            if (!hasCallback && typeof Promise !== 'undefined') {
                promise = new Promise(function(resolve) {
                    resolvePromise = resolve;
                });
            }

            var params = args.concat(function() {
                if (callback) {
                    callback.apply(this);
                }

                if (resolvePromise) {
                    resolvePromise(resolveValue(this));
                    resolvePromise = null;
                }
            });

            $.boxes.apply($, [method].concat(params));

            return promise;
        };
    };

    window.alert = wrap('alert', 1);
    window.confirm = wrap('confirm', 1);
    window.prompt = wrap('prompt', 2);
})(jQuery);
