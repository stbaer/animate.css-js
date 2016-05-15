/**
 * Set the css animationDuration on an element (el). Leave duration undefined to reset;
 * @private
 *
 * @param {Element} el
 * @param {number} [duration] in ms
 */
var setAnimationDuration = function (el, duration) {
    var durationMs = duration ? duration + 'ms' : '';
    el.style['-webkit-animation-duration'] = durationMs;
    el.style['animation-duration'] = durationMs;
};

/**
 * Add or remove the 'animated' class and the animation type class.
 * @private
 *
 * @param {Element} el
 * @param {String} animationName
 * @param {Boolean} [doAdd=true] - set to false to remove the classes
 */
var setAnimateCssClasses = function (el, animationName, doAdd) {

    ['animated', animationName].forEach(function (str) {
        el.classList[doAdd !== false ? 'add' : 'remove'](str);
    });

};

//https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
var whichAnimationEvent = function () {
    var el = document.createElement('fakeelement'), t;

    var animations = {
        'animation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'MozAnimation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd'
    };

    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
};

/**
 *
 * @param {Element} el
 * @param {object} opts
 * @property {string} opts.animationName
 * @property {number} [opts.duration]
 * @param {function[]} [opts.callbacks=[]]
 */
var animate = function (el, opts) {

    opts.callbacks = opts.callbacks || [];

    var animationEventName = whichAnimationEvent();

    if (opts.duration) {
        setAnimationDuration(el, opts.duration);
    }
    setAnimateCssClasses(el, opts.animationName);
    el.addEventListener(animationEventName, animEnd);

    function animEnd() {

        el.removeEventListener(animationEventName, animEnd);
        //remove the animate.css classes
        setAnimateCssClasses(el, opts.animationName, false);

        if (opts.duration) {
            //reset animationDuration
            setAnimationDuration(el);
        }
        // call the callbacks
        opts.callbacks.forEach(function (cb) {
            cb();
        });
        opts.callbacks = [];
    }
};

/**
 *
 * @param {Element} el
 * @param {object} [opts]
 * @property {string} [opts.animationName='slideInDown']
 * @property {number} [opts.duration=300]
 * @param {function[]} [opts.callbacks]
 */
var show = function (el, opts) {
    opts = opts || {};

    opts.animationName = opts.animationName || 'slideInDown';
    opts.duration = opts.duration || 350;

    el.classList.remove('hidden');
    animate(el, opts);
};

/**
 *
 * @param {Element} el
 * @param {object} [opts]
 * @property {string} [opts.animationName='slideInDown']
 * @property {number} [opts.duration=300]
 * @param {function[]} [opts.callbacks]
 */
var hide = function (el, opts) {

    opts = opts || {};

    opts.animationName = opts.animationName || 'slideOutUp';
    opts.duration = opts.duration || 300;
    opts.callbacks = opts.callbacks || [];

    //if the element is already hidden
    if (el.classList.contains('hidden')) {
        //call the callbacks directly
        opts.callbacks.forEach(function (cb) {
            cb();
        });
        //and get out
        return;
    }

    opts.callbacks.push(function () {
        el.classList.add('hidden');
    });
    animate(el, opts);
};

/**
 * API
 *
 * @type {{animateCSS: Function, show: Function, hide: Function}}
 */
var animations = {
    animate: animate,
    // show and hide convenience functions
    show: show,
    hide: hide
};

module.exports = animations;
