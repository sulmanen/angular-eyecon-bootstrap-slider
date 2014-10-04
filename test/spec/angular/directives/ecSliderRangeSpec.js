describe('ecSlider', function() {
    'use strict';

    var el, parentScope, scope, $timeout, slider;

    beforeEach(module('ecSlider'));

    beforeEach(inject(function($rootScope, $compile, _$timeout_){
        parentScope = $rootScope.$new();
        parentScope.slider = {
            id: 'slider',
            val: [0.1, 0.9],
            change: function(){},
            cfg: {
                min: 0,
                max: 1.0,
                step: 0.01,
                range: true,
                value: [0.1, 0.9]
            }
        };

        parentScope.disabled = false;
        $timeout = _$timeout_;

        spyOn(parentScope.slider, 'change');

        el = angular.element('<ec-slider ng-change="slider.change()" ng-model="slider.val" config="slider.cfg" ng-disabled="disabled"></ec-slider>');
        document.body.appendChild(el[0]);
        $compile(el)(parentScope);
        parentScope.$digest();
        $timeout.flush();
        scope = el.isolateScope();
        slider = scope.ecSlider.get();
    }));

    it('inits correctly', function() {
        expect(slider.slider('getAttribute', 'value')).toEqual([0.1, 0.9]);
    });

    describe('data binding for range', function() {
        _.forEach([
            {
                msg: 'dont update if val under range',
                val: [-0.1, 0.9],
                expected: [0.1, 0.9]
            },
            {
                msg: 'dont update update if val under range',
                val: [2, 0.9],
                expected: [0.1, 0.9]
            },
            {
                msg: 'updates slider value on update of ngModel',
                val: [0.1, 0.4],
                expected: [0.1, 0.4]
            },
            {
                msg: 'update slider value from string value',
                val: ['0.6', '0.8'],
                expected: [0.6, 0.8]
            }
        ], function(test) {
            it(test.msg, function() {
                parentScope.slider.val = test.val;
                parentScope.$digest();
                expect(slider.slider('getAttribute', 'value')).toEqual(test.expected);
            });
        });
    });
});
