/**
 * Set the css animationDuration on an element (el). Leave duration undefined to reset;
 * @private
 *
 * @param {Element} el
 * @param {number} [duration] in ms
 */
var setAnimationDuration = function(el, duration) {
    el.style['-webkit-animation-duration'] = duration ? duration + 'ms' : '';
    el.style['animation-duration'] = duration ? duration + 'ms' : '';
};

/**
 * Add or remove the 'animated' class and the animation type class.
 * @private
 *
 * @param {Element} el
 * @param {String} animationName
 * @param {Boolean} [doAdd=true] - set to false to remove the classes
 */
var setAnimateCssClasses = function(el, animationName, doAdd) {

    var addOrRemove = doAdd !== false ? 'add' : 'remove';

    el.classList[addOrRemove]('animated');
    el.classList[addOrRemove](animationName);
};

//https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
var whichAnimationEvent = function() {
    var t,
        el = document.createElement('fakeelement');

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
var animate = function(el, opts) {

    opts.callbacks = opts.callbacks || [];

    var className = opts.animationName;
    var animationEventName = whichAnimationEvent();

    if (opts.duration) {
        setAnimationDuration(el, opts.duration);
    }
    setAnimateCssClasses(el, className);
    el.addEventListener(animationEventName, animEnd);
    function animEnd() {

        el.removeEventListener(animationEventName, animEnd);
        //remove the animate.css classes
        setAnimateCssClasses(el, className, false);

        if (opts.duration) {
            //reset animationDuration
            setAnimationDuration(el);
        }
        // call the callbacks
        opts.callbacks.forEach(function(cb) {
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
var show = function(el, opts) {
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
var hide = function(el, opts) {

    opts = opts || {};

    opts.animationName = opts.animationName || 'slideOutUp';
    opts.duration = opts.duration || 300;
    opts.callbacks = opts.callbacks || [];

    //if the element is already hidden
    if (el.classList.contains('hidden')) {
        //call the callbacks directly
        opts.callbacks.forEach(function(cb) {
            cb();
        });
        //and get out
        return;
    }

    opts.callbacks.push(function() {
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
