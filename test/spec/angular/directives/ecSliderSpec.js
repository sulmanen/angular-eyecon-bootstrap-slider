describe('ecSlider', function() {
    'use strict';

    var el, parentScope, scope, $timeout, slider, sliderTwo, scopeTwo, elTwo;

    beforeEach(module('ecSlider'));

    beforeEach(inject(function($rootScope, $compile, _$timeout_) {
        parentScope = $rootScope.$new();
        parentScope.slider = {
            id: 'slider',
            val: 0.5,
            change: function(){},
            cfg: {min: 0.01, max: 1.0, step: 0.01}
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

    it('exists', function() {
        expect(el).toBeDefined();
    });

    it('has been init', function(){
        expect(slider).toBeDefined();
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
        scope.ecSlider.getCtrl().$setViewValue(0.2);

        expect(parentScope.slider.change).toHaveBeenCalled();
    });

    it('sets initial value correctly', function() {
        expect(slider.slider('getValue')).toBe(0.5);
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

    describe('slide', function() {
        beforeEach(function() {
            slider.trigger({type: 'slide', value: 1});
            $timeout.flush();
        });

        it('should update ngModel to 1', function() {
            expect(parentScope.slider.val).toBe(1);
        });
    });

    describe('data binding', function() {
        it('updates slider value on update of ngModel', function() {
            parentScope.slider.val = 0.1;
            parentScope.$apply();
            expect(slider.slider('getValue')).toBe(parentScope.slider.val);
        });
    });
});
