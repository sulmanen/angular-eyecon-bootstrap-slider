angular.module('ecSlider').directive('ecSlider', ['$timeout',
    function($timeout) {
        'use strict';
        return {
            require: 'ngModel',
            restrict: 'E',
            scope: {
                config: '=',
                ngModel: '='
            },
            link: function(scope, el, attrs, ctrl) {
                var slider,
                    init = function init(el, config, ctrl, scope) {
                        var s = el.slider(config);
                        s.on('slide', function(e) {
                            ctrl.$setViewValue(e.value);
                            $timeout(function() {
                                scope.$digest();
                            });
                        });
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
                    var newVal = scope.ngModel;
                    if (slider && (newVal || newVal === 0)) {
                        slider.slider('setValue', newVal, false); // no event
                    }
                });

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
