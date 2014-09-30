(function () {
    'use strict';
    angular.module('ecSlider', []);
}());

angular.module('ecSlider').directive('ecSlider', ['$timeout',
    function($timeout) {
        'use strict';
        var slider,
            init = function init(el, config, ctrl) {
                var s = el.slider(config);
                s.on('slide', function(e) {
                    $timeout(function() {
                        ctrl.$setViewValue(e.value);
                    });
                });
                return s;
            },
            render = function render(el, config, ctrl) {
                $timeout(function() {
                    slider = init(el, config, ctrl);
                });
            };

        return {
            require: 'ngModel',
            restrict: 'E',
            scope: {
                config: '='
            },
            controller: ['$scope',
                function($scope) {
                    $scope.ecSlider = {
                        get: function() { // visible for testing
                            return slider;
                        }
                    };
                }
            ],
            link: function(scope, el, attrs, ctrl) {
                scope.$watch('config', function(newConfig) {
                    if (newConfig) {
                        render(el, newConfig, ctrl);
                    }
                });

                attrs.$observe('ngModel', function(val) {
                    var newVal = scope.$parent.$eval(val);

                    if (!slider) {
                        slider = init(el, scope.config, ctrl);
                    }

                    if (newVal || newVal === 0) {
                        slider.slider('setValue', newVal, false); // no event
                        ctrl.$setViewValue(newVal);
                    }
                });

                if (attrs.ngChange) {
                    ctrl.$viewChangeListeners.push(function() {
                        $timeout(scope.$parent.$eval(attrs.ngChange));
                    });
                }

                attrs.$observe(attrs.ngDisabled, function() {
                    var newVal = scope.$parent.$eval(attrs.ngDisabled);
                    if (typeof newVal === 'boolean') {
                        if (newVal) {
                            slider.slider('disable');
                        } else {
                            slider.slider('enable');
                        }
                    }
                });

                scope.$on('$destroy', function() {
                    slider.slider('destroy');
                });
            }
        };
    }
]);
