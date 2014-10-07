(function () {
    'use strict';
    angular.module('ecSlider', []);
}());

angular.module('ecSlider').directive('ecSlider', ['$timeout',
    function($timeout) {
        'use strict';

        function sanitize(newVal) {
            return (isArray(newVal) ? newVal.map(maybeSanitize) : maybeSanitize(newVal));
        }

        function maybeSanitize(val) {
            return (typeof val === 'string' ? parseFloat(val) : val);
        }

        function isArray(a) {
            return angular.isArray(a);
        }

        function allInBetween(newVal, config) {
            return newVal.map(function(val) {
                return inBetween(val, config);
            }).filter(function(val){
                return val === false;
            }).length === 0;
        }

        function inBetween(newVal, config) {
            return (newVal >= config.min) &&
                (newVal <= config.max);
        }

        function inRange(newVal, config) {
            return (isArray(newVal) ? allInBetween(newVal, config) : inBetween(newVal, config));

        }

        function isDefined(val) {
            return val != null;
        }

        function init(el, config, ctrl, scope) {
            var s;
            if (config &&
                isDefined(config.min) &&
                isDefined(config.max) &&
                isDefined(scope.ngModel)) {
                config.value = sanitize(scope.ngModel);
                s = el.slider(config);

                s.on('slide', function(e) {
                    var newVal = e.value;
                    if (isDefined(newVal) &&
                        inRange(newVal, scope.config)) {
                        ctrl.$setViewValue(newVal);
                        $timeout(function() {
                            scope.$digest();
                        });
                    }
                });
            }
            return s;
        }

        return {
            require: 'ngModel',
            replace: true,
            restrict: 'E',
            scope: {
                config: '=',
                ngModel: '=',
                ngDisabled: '='
            },
            link: function(scope, el, attrs, ctrl) {
                var slider,
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
                        render(el, newConfig, ctrl);
                    }
                }, true);

                scope.$watch('ngModel', function() {
                    var newVal = sanitize(scope.ngModel);

                    if (slider &&
                        isDefined(newVal) &&
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

                scope.$watch('ngDisabled', function() {
                    var newVal = scope.ngDisabled;
                    if (slider && newVal != null) {
                        slider.slider((newVal ? 'disable': 'enable'));
                    }
                });

                scope.$on('$destroy', function() {
                    if (slider) {
                        slider.slider('destroy');
                    }
                });
            }
        };
    }
]);
