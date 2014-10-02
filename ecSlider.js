(function () {
    'use strict';
    angular.module('ecSlider', []);
}());

angular.module('ecSlider').directive('ecSlider', ['$timeout',
    function($timeout) {
        'use strict';
        return {
            require: 'ngModel',
            replace: true,
            restrict: 'E',
            scope: {
                config: '=',
                ngModel: '='
            },
            link: function(scope, el, attrs, ctrl) {
                var slider,
                    sanitize = function sanitize(newVal) {
                        var i;
                        if (isArray(newVal)) {
                            for (i = 0; i < newVal.length; i++) {
                                if (typeof newVal[i] === 'string') {
                                    newVal[i] = parseInt(newVal[i], 10);
                                }
                            }
                        } else {
                            if (typeof newVal === 'string') {
                                newVal = parseInt(newVal, 10);
                            }
                        }
                        return newVal;
                    },
                    isArray = function isArray(a) {
                        if (Object.prototype.toString.call(a) === '[object Array]') {
                            return true;
                        }
                        return false;
                    },
                    allInBetween = function allInBetween(newVal, config) {
                        var i;
                        for (i = 0; i < newVal.length; i++) {
                            if (!inBetween(newVal[i], config)) {
                                return false;
                            }
                        }
                        return true;
                    },
                    inBetween = function inBetween(newVal, config) {
                        return (newVal >= config.min) &&
                            (newVal <= config.max);
                    },
                    inRange = function hasUnderflow(newVal, config) {
                        return (isArray(newVal) ? allInBetween(newVal, config) : inBetween(newVal, config));

                    },
                    init = function init(el, config, ctrl, scope) {
                        var s;
                        if (config &&
                            (config.min || config.min === 0) &&
                            (config.max || config.max === 0) &&
                            (config.value || config.value === 0)) {

                            s = el.slider(config);
                            s.on('slide', function(e) {
                                var newVal = e.value;
                                if((newVal || newVal === 0) &&
                                   inRange(newVal, scope.config)) {
                                    ctrl.$setViewValue(newVal);
                                    $timeout(function() {
                                        scope.$digest();
                                    });
                                }
                            });
                        }
                        return s;
                    },
                    render = function render(el, config, ctrl) {
                        $timeout(function() {
                            slider = init(el, config, ctrl, scope);
                        });
                    };

                scope.ecSlider = {
                    get: function() { // visible for testing
                        return slider;
                    },
                    getCtrl: function() {
                        return ctrl;
                    }
                };

                scope.$watch('config', function() {

                    var newConfig = scope.config;
                    if (newConfig) {
                        newConfig.value = scope.ngModel;
                        render(el, newConfig, ctrl);
                    }
                }, true);

                scope.$watch('ngModel', function() {
                    var newVal = sanitize(scope.ngModel);

                    if (slider &&
                        (newVal || newVal === 0) &&
                        inRange(newVal, scope.config)) {
                        slider.slider('setValue', newVal, false); // no event
                    }
                }, true);

                if (attrs.ngChange) {
                    ctrl.$viewChangeListeners.push(function() {
                        $timeout(function() {
                            scope.$parent.$apply(attrs.ngChange);
                        });
                    });
                }

                attrs.$observe(attrs.ngDisabled, function() {
                    var newVal = scope.$parent.$eval(attrs.ngDisabled);
                    if (typeof newVal === 'boolean' && slider) {
                        if (newVal) {
                            slider.slider('disable');
                        } else {
                            slider.slider('enable');
                        }
                    }
                });

                scope.$on('$destroy', function() {
                    if(slider) {
                        slider.slider('destroy');
                    }
                });
            }
        };
    }
]);
