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

    it('jquery plugin exists', function() {

        expect($(el).slider).toBeDefined();
    });

    it('supports view change listeners', function() {
        parentScope.slider.val = 10;
        $timeout.flush();
        expect(parentScope.slider.change).toHaveBeenCalled();
    });
});
