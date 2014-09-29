describe('ecSlider', function() {
    'use strict';

    var el, parentScope, scope, $timeout, slider;

    beforeEach(module('ecSlider'));

    beforeEach(inject(function($rootScope, $compile, _$timeout_) {

        parentScope = $rootScope.$new();
        parentScope.slider = {
            val: 50,
            change: function(){},
            cfg: {}
        };
        parentScope.disabled = false;
        $timeout = _$timeout_;

        spyOn(parentScope.slider, 'change');

        el = angular.element('<ec-slider ng-change="slider.change" ng-model="slider.val" config="slider.cfg" ng-disabled="disabled"></ec-slider>');
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

    it('is enabled if not disabled', function() {
        expect(slider.slider('isEnabled')).toBe(true);
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

        it('should be disabled', function() {
            parentScope.disabled = true;
            parentScope.$digest();
            expect(slider.slider('isEnabled')).toBe(false);
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
