/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  var module = angular.module('onsen.services');

  module.service('OnsenUtil', function($rootScope, $window) {
    return {

      /**
       * Create modifier templater function. The modifier templater generate css classes binded modifier name.
       *
       * @param {Object} attrs
       * @return {Function} 
       */
      generateModifierTemplater: function(attrs) {
        var modifiers = attrs && typeof attrs.modifier === 'string' ? attrs.modifier.trim().split(/ +/) : [];

        /**
         * @return {String} template eg. 'ons-button--*', 'ons-button--*__item'
         * @return {String}
         */
        return function(template) {
          return modifiers.map(function(modifier) {
            return template.replace('*', modifier);
          }).join(' ');
        };
      },

      /**
       * Define a variable to JavaScript global scope and AngularJS scope as 'var' attribute name.
       *
       * @param {Object} attrs
       * @param object
       */
      declareVarAttribute: function(attrs, object) {
        if (typeof attrs['var'] === 'string') {
          this._defineVar(attrs['var'], object);
        }
      },

      /**
       * Define a variable to JavaScript global scope and AngularJS scope.
       *
       * Util.defineVar('foo', 'foo-value');
       * // => window.foo and $scope.foo is now 'foo-value'
       *
       * Util.defineVar('foo.bar', 'foo-bar-value');
       * // => window.foo.bar and $scope.foo.bar is now 'foo-bar-value'
       *
       * @param {String} name
       * @param object
       */
      _defineVar: function(name, object) {
        var names = name.split(/\./);

        function set(container, names, object) {
          var name;
          for (var i = 0; i < names.length - 1; i++) {
            name = names[i];
            if (container[name] === undefined || container[name] === null) {
              container[name] = {};
            }
            container = container[name];
          }

          container[names[names.length - 1]] = object;
        }

        set($window, names, object);
        set($rootScope, names, object);        
      }

    };
  });
})();

