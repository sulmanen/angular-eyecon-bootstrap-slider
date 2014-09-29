angular.module('ecSlider').directive('ecSlider', ['$timeout', function($timeout) {
    'use strict';
    var slider,
        effectiveConfig,
        render = function(el, config) {
            $timeout(function() {
                slider = $(el).slider(config);
            });
        };

    return {
        require: 'ngModel',
        restrict: 'E',
        scope: {
            min: '=',
            max: '=',
            step: '=',
            range: '=',
            config: '='
        },
        link: function(scope, el, attrs, ctrl) {
            scope.$watch('config', function() {
                effectiveConfig = angular.extend(scope.config, {});
            });

            attrs.$observe('ngModel', function(val) {
                var newVal = scope.$parent.$eval(val);

                if(!slider) {
                    slider = $(el).slider();
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
        }
    };
}]);
