describe('ecSlider', function() {
    'use strict';

    var el, parentScope, scope, change, $timeout;

    beforeEach(module('ecSlider'));

    beforeEach(inject(function($rootScope, $compile, _$timeout_) {

        parentScope = $rootScope.$new();
        parentScope.slider = {
            val: 50,
            change: function(){},
            cfg: {}
        };

        $timeout = _$timeout_;

        spyOn(parentScope.slider, 'change');

        el = angular.element('<ec-slider ng-change="slider.change" ng-model="slider.val" config="slider.cfg"></ec-slider>');
        $compile(el)(parentScope);
        parentScope.$digest();
        scope = el.isolateScope();
    }));

    it('exists', function() {
        expect(el).toBeDefined();
    });

    it('has isolate scope', function() {
        expect(scope).toBeDefined();
    });

    it('has scope namespace', function() {
        expect(scope.ecSlider).toBeDefined();
    });

    it('jquery plugin is here', function() {
        expect($(el).slider).toBeDefined();
    });

    it('supports view change listeners', function() {
        parentScope.slider.val = 10;
        $timeout.flush();
        expect(parentScope.slider.change).toHaveBeenCalled();
    });

    it('sets initial value correctly', function() {
        expect($(el).slider('getValue')).toBe(10);
    });

    describe('$destroy', function() {
        var slider;

        beforeEach(function() {
            slider = scope.ecSlider.get();

            spyOn(slider, 'slider');
            parentScope.$broadcast('$destroy');
            parentScope.$digest();
        });

        it('calls destroy on bootstrap slider', function() {
            expect(slider.slider).toHaveBeenCalledWith('destroy');
        });
    });
});
