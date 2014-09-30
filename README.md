ecSlider
=========
[![Build Status](https://travis-ci.org/sulmanen/angular-eyecon-bootstrap-slider.png?branch=master)](https://travis-ci.org/sulmanen/angular-eyecon-bootstrap-slider)
directive for [eyecon bootstrap slider](https://github.com/seiyria/bootstrap-slider)

Include the file and import the angular ecSlider angular module.

```javascript
angular.module('myModule', ['ecSlider']);
```

```html
        <ec-slider ng-model="myCtrl.val" // value
                   config="myCtrl.sliderConfig" // jquery plugin config object
                   ng-change="callMeOnChange" // optional change callback
                   ng-disabled="myCtrl.disableIfTrue"> // disable when true
        </ec-slider>
```

The config options are those passed directly to the slider [jquery plugin](http://seiyria.github.io/bootstrap-slider/). The directive will re-init if the config changes.

Destruction of scope will call slider('destroy')
