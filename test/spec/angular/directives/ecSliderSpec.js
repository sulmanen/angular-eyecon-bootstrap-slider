describe('ecSlider', function() {
    'use strict';

    var el, parentScope, scope, change, $timeout, slider;

    beforeEach(module('ecSlider'));

    beforeEach(inject(function($rootScope, $compile, _$timeout_) {

        parentScope = $rootScope.$new();
        parentScope.slider = {
            val: 50,
            change: function(){},
            cfg: {},
            disabled: false
        };

        $timeout = _$timeout_;

        spyOn(parentScope.slider, 'change');

        el = angular.element('<ec-slider ng-change="slider.change" ng-model="slider.val" config="slider.cfg" ng-disabled="slider.disabled"></ec-slider>');
        document.body.appendChild(el[0]);
        $compile(el)(parentScope);
        parentScope.$digest();
        scope = el.isolateScope();
        slider = scope.ecSlider.get();
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

    describe('ngDisabled', function() {
        it('should be enabled when disabled false', function() {
            expect(slider.slider('isEnabled')).toBe(true);
        });

        describe('with disabled true', function() {
            beforeEach(function() {
                parentScope.slider.disabled = true;
            });

            it('should be disabled', function() {
                expect(slider.slider('isEnabled')).toBe(false);
            });
        });
    });

    describe('scope.$destroy', function() {
        beforeEach(function() {
            spyOn(slider, 'slider');
            parentScope.$broadcast('$destroy');
            parentScope.$digest();
        });

        it('calls destroy on bootstrap slider', function() {
            expect(slider.slider).toHaveBeenCalledWith('destroy');
        });
    });

});
