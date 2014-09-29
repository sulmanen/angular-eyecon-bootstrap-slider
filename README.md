ecSlider
=========
directive for [eyecon bootstrap slider](https://github.com/seiyria/bootstrap-slider)

`<ec-slider ng-model="myCtrl.val" config="myCtrl.sliderConfig" ng-change="callMeOnChange" ng-disabled="myCtrl.disableIfTrue"></ec-slider>`

The config options are those passed directly to the jquery plugin. The directive will re-init if the config changes.

Destruction of scope will call slider('destroy')