describe('ecSlider', function() {
    'use strict';

    var el, parentScope, scope;

    beforeEach(module('ecSlider'));

    beforeEach(inject(function($rootScope, $compile) {
        parentScope = $rootScope.$new();
        el = angular.element('<ec-slider></ec-slider>');
        $compile(el)(parentScope);
        parentScope.$digest();
        scope = el.isolateScope();
    }));

    it('exists', function() {
        expect(el).toBeDefined();
    });

});
